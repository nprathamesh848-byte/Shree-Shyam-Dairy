
-- ============ ENUMS ============
create type public.app_role as enum ('customer','admin','manager','staff');
create type public.order_status as enum ('pending','confirmed','preparing','out_for_delivery','delivered','cancelled');
create type public.discount_type as enum ('percentage','fixed');

-- ============ UPDATED_AT ============
create or replace function public.update_updated_at_column()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  email text,
  mobile text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

-- ============ USER ROLES ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.is_admin(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','manager'))
$$;

create policy "own profile read" on public.profiles for select to authenticated using (auth.uid() = id or public.is_admin(auth.uid()));
create policy "own profile insert" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update to authenticated using (auth.uid() = id or public.is_admin(auth.uid())) with check (true);
create policy "own roles read" on public.user_roles for select to authenticated using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- new user trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, mobile)
  values (new.id, coalesce(new.raw_user_meta_data->>'name',''), new.email, new.raw_user_meta_data->>'mobile')
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'customer') on conflict do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- ============ CATEGORIES ============
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  image text,
  sort_order int not null default 0,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;
grant all on public.categories to service_role;
alter table public.categories enable row level security;
create policy "categories public read" on public.categories for select to anon, authenticated using (true);
create policy "categories admin write" on public.categories for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_categories_updated before update on public.categories for each row execute function public.update_updated_at_column();

-- ============ PRODUCTS ============
create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text,
  image text,
  ingredients text,
  benefits text,
  storage_instructions text,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_products_category on public.products(category_id);
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant all on public.products to service_role;
alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (true);
create policy "products admin write" on public.products for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_products_updated before update on public.products for each row execute function public.update_updated_at_column();

-- ============ VARIANTS ============
create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  quantity numeric not null default 1,
  unit text not null default 'L',
  label text not null,
  price numeric(10,2) not null default 0,
  mrp numeric(10,2),
  stock int not null default 0,
  minimum_stock int not null default 5,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_variants_product on public.product_variants(product_id);
grant select on public.product_variants to anon, authenticated;
grant insert, update, delete on public.product_variants to authenticated;
grant all on public.product_variants to service_role;
alter table public.product_variants enable row level security;
create policy "variants public read" on public.product_variants for select to anon, authenticated using (true);
create policy "variants admin write" on public.product_variants for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_variants_updated before update on public.product_variants for each row execute function public.update_updated_at_column();

-- ============ ADDRESSES ============
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  mobile text not null,
  address text not null,
  landmark text,
  city text not null,
  pincode text not null,
  type text not null default 'home',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_addresses_user on public.addresses(user_id);
grant select, insert, update, delete on public.addresses to authenticated;
grant all on public.addresses to service_role;
alter table public.addresses enable row level security;
create policy "own addresses" on public.addresses for all to authenticated using (auth.uid() = user_id or public.is_admin(auth.uid())) with check (auth.uid() = user_id);
create trigger t_addresses_updated before update on public.addresses for each row execute function public.update_updated_at_column();

-- ============ ORDERS ============
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_mobile text not null,
  address_text text not null,
  landmark text,
  city text,
  pincode text,
  delivery_instructions text,
  subtotal numeric(10,2) not null default 0,
  discount numeric(10,2) not null default 0,
  delivery_charge numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  coupon_code text,
  payment_method text not null default 'COD',
  payment_status text not null default 'pending',
  order_status public.order_status not null default 'pending',
  whatsapp_sent boolean not null default false,
  email_sent boolean not null default false,
  status_history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_orders_user on public.orders(user_id);
create index idx_orders_created on public.orders(created_at desc);
grant select on public.orders to authenticated;
grant update on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "orders own read" on public.orders for select to authenticated using (auth.uid() = user_id or public.is_admin(auth.uid()));
create policy "orders admin update" on public.orders for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_orders_updated before update on public.orders for each row execute function public.update_updated_at_column();

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  variant_label text not null,
  quantity int not null default 1,
  price numeric(10,2) not null default 0,
  subtotal numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);
create index idx_order_items_order on public.order_items(order_id);
grant select on public.order_items to authenticated;
grant all on public.order_items to service_role;
alter table public.order_items enable row level security;
create policy "order items read" on public.order_items for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or public.is_admin(auth.uid()))));

-- ============ OFFERS ============
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  discount_type public.discount_type not null default 'percentage',
  discount_value numeric(10,2) not null default 0,
  minimum_order numeric(10,2) not null default 0,
  maximum_discount numeric(10,2),
  coupon_code text,
  terms text,
  category_id uuid references public.categories(id) on delete set null,
  start_date timestamptz not null default now(),
  end_date timestamptz,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.offers to anon, authenticated;
grant insert, update, delete on public.offers to authenticated;
grant all on public.offers to service_role;
alter table public.offers enable row level security;
create policy "offers public read" on public.offers for select to anon, authenticated using (true);
create policy "offers admin write" on public.offers for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_offers_updated before update on public.offers for each row execute function public.update_updated_at_column();

-- ============ COUPONS ============
create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type public.discount_type not null default 'percentage',
  discount_value numeric(10,2) not null default 0,
  minimum_order numeric(10,2) not null default 0,
  maximum_discount numeric(10,2),
  usage_limit int,
  used_count int not null default 0,
  expiry_date timestamptz,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.coupons to authenticated;
grant all on public.coupons to service_role;
alter table public.coupons enable row level security;
create policy "coupons admin all" on public.coupons for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_coupons_updated before update on public.coupons for each row execute function public.update_updated_at_column();

-- ============ BANNERS ============
create table public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image text,
  button_text text,
  button_link text,
  start_date timestamptz not null default now(),
  end_date timestamptz,
  status boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.banners to anon, authenticated;
grant insert, update, delete on public.banners to authenticated;
grant all on public.banners to service_role;
alter table public.banners enable row level security;
create policy "banners public read" on public.banners for select to anon, authenticated using (true);
create policy "banners admin write" on public.banners for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create trigger t_banners_updated before update on public.banners for each row execute function public.update_updated_at_column();

-- ============ NOTIFICATIONS ============
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'general',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
create index idx_notifications_user on public.notifications(user_id);
grant select, update on public.notifications to authenticated;
grant insert, delete on public.notifications to authenticated;
grant all on public.notifications to service_role;
alter table public.notifications enable row level security;
create policy "notifications own read" on public.notifications for select to authenticated using (user_id = auth.uid() or user_id is null or public.is_admin(auth.uid()));
create policy "notifications own update" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notifications admin write" on public.notifications for insert to authenticated with check (public.is_admin(auth.uid()));
create policy "notifications admin delete" on public.notifications for delete to authenticated using (public.is_admin(auth.uid()));

-- ============ SETTINGS ============
create table public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.settings to anon, authenticated;
grant insert, update on public.settings to authenticated;
grant all on public.settings to service_role;
alter table public.settings enable row level security;
create policy "settings public read" on public.settings for select to anon, authenticated using (true);
create policy "settings admin write" on public.settings for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ============ ORDER NUMBER SEQUENCE ============
create table public.order_counters (
  day date primary key,
  counter int not null default 0
);
grant all on public.order_counters to service_role;
alter table public.order_counters enable row level security;

create or replace function public.next_order_number()
returns text language plpgsql security definer set search_path = public as $$
declare d date := (now() at time zone 'Asia/Kolkata')::date; c int;
begin
  insert into public.order_counters(day, counter) values (d, 1)
  on conflict (day) do update set counter = public.order_counters.counter + 1
  returning counter into c;
  return 'SSD-' || to_char(d,'YYYYMMDD') || '-' || lpad(c::text, 4, '0');
end; $$;

-- ============ SEED ============
insert into public.settings(key, value) values
 ('business', '{"name":"Shree Shyam Dairy","phone":"9158619237","email":"kunalchavan9503@gmail.com","address":"Main Road, Baramati, Pune, Maharashtra","hours":"6:00 AM - 9:00 PM"}'::jsonb),
 ('delivery', '{"delivery_charge":30,"free_delivery_threshold":500,"minimum_order":50,"areas":["Baramati","Pune"],"pincodes":["413102","411001"]}'::jsonb),
 ('orders', '{"accepting_orders":true}'::jsonb),
 ('notifications', '{"email_notifications":true,"customer_notifications":true}'::jsonb);

insert into public.categories (name, slug, description, sort_order) values
 ('Milk','milk','Fresh farm milk delivered daily',1),
 ('Curd','curd','Thick, creamy set curd',2),
 ('Paneer','paneer','Soft fresh cottage cheese',3),
 ('Lassi','lassi','Sweet and plain lassi',4),
 ('Buttermilk','buttermilk','Refreshing spiced chaas',5),
 ('Butter','butter','Fresh white and table butter',6),
 ('Ghee','ghee','Pure desi cow ghee',7),
 ('Cheese','cheese','Processed and cheddar cheese',8),
 ('Flavoured Milk','flavoured-milk','Chilled flavoured milk',9),
 ('Other Dairy Products','other','Sweets and more',10);

do $$
declare
  c_milk uuid; c_curd uuid; c_paneer uuid; c_lassi uuid; c_bm uuid; c_butter uuid; c_ghee uuid; c_cheese uuid; c_fm uuid;
  p uuid;
begin
  select id into c_milk from public.categories where slug='milk';
  select id into c_curd from public.categories where slug='curd';
  select id into c_paneer from public.categories where slug='paneer';
  select id into c_lassi from public.categories where slug='lassi';
  select id into c_bm from public.categories where slug='buttermilk';
  select id into c_butter from public.categories where slug='butter';
  select id into c_ghee from public.categories where slug='ghee';
  select id into c_cheese from public.categories where slug='cheese';
  select id into c_fm from public.categories where slug='flavoured-milk';

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_milk,'Fresh Cow Milk','Pure single-source cow milk, pasteurised daily.','100% cow milk','Rich in calcium and easy to digest','Refrigerate at 4°C, consume within 2 days') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,500,'ml','500 ml',30,32,120),(p,1,'L','1 L',58,62,90),(p,2,'L','2 L',112,120,40);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_milk,'Full Cream Milk','Creamy full-fat milk, perfect for tea and sweets.','Full cream milk','High energy and creamy texture','Keep refrigerated') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,500,'ml','500 ml',34,36,80),(p,1,'L','1 L',66,70,60);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_milk,'Toned Milk','Light everyday milk with reduced fat.','Toned milk','Lower fat, daily use','Keep refrigerated') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,500,'ml','500 ml',26,28,100),(p,1,'L','1 L',50,54,70);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_curd,'Fresh Curd','Freshly set curd from farm milk.','Milk, live cultures','Good for gut health','Refrigerate, consume within 3 days') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'g','200 g',25,28,60),(p,500,'g','500 g',55,60,45),(p,1,'kg','1 kg',100,110,25);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_curd,'Thick Curd','Extra thick malai curd.','Milk, cultures','Rich and creamy','Refrigerate') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,400,'g','400 g',60,65,30),(p,1,'kg','1 kg',140,150,15);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_paneer,'Fresh Paneer','Soft, fresh paneer made every morning.','Milk, citric acid','High protein','Refrigerate, use within 2 days') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'g','200 g',90,100,40),(p,500,'g','500 g',210,230,25),(p,1,'kg','1 kg',400,440,10);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_lassi,'Sweet Lassi','Chilled sweet lassi with malai.','Curd, sugar','Instant refreshment','Serve chilled') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'ml','200 ml',25,28,80),(p,500,'ml','500 ml',50,55,50);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_lassi,'Plain Lassi','Lightly salted plain lassi.','Curd, salt','Cooling and light','Serve chilled') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'ml','200 ml',20,22,70),(p,500,'ml','500 ml',40,45,40);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_bm,'Spiced Buttermilk','Masala chaas with jeera and mint.','Curd, spices','Aids digestion','Serve chilled') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'ml','200 ml',15,18,90),(p,1,'L','1 L',60,65,30);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_butter,'Fresh Butter','Homestyle white butter.','Cream','Pure and unsalted','Refrigerate') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'g','200 g',110,120,20),(p,500,'g','500 g',260,280,8);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_ghee,'Pure Desi Ghee','Bilona-style cow ghee with rich aroma.','Cow milk butter','Boosts immunity','Store in a cool dry place') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,500,'ml','500 ml',420,460,18),(p,1,'L','1 L',820,900,9);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_cheese,'Cheese Block','Creamy processed cheese block.','Milk solids, salt','Great for sandwiches','Refrigerate') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'g','200 g',130,140,14),(p,400,'g','400 g',250,270,4);

  insert into public.products (category_id,name,description,ingredients,benefits,storage_instructions)
  values (c_fm,'Flavoured Milk','Kesar, rose and chocolate flavoured milk.','Milk, sugar, flavour','Tasty and chilled','Serve chilled') returning id into p;
  insert into public.product_variants (product_id,quantity,unit,label,price,mrp,stock) values
   (p,200,'ml','200 ml',30,35,60),(p,500,'ml','500 ml',70,80,25);
end $$;

insert into public.offers (name,description,discount_type,discount_value,minimum_order,maximum_discount,coupon_code,terms,end_date)
values
 ('10% OFF on Paneer','Get 10% off on all fresh paneer variants.','percentage',10,150,60,'PANEER10','Valid on paneer products only.', now() + interval '30 days'),
 ('₹50 OFF above ₹500','Flat ₹50 off on orders above ₹500.','fixed',50,500,50,'SAVE50','One use per order.', now() + interval '60 days'),
 ('Weekend Lassi Offer','15% off on all lassi this weekend.','percentage',15,100,40,'LASSI15','Valid on weekends.', now() + interval '14 days');

insert into public.coupons (code,discount_type,discount_value,minimum_order,maximum_discount,usage_limit,expiry_date) values
 ('PANEER10','percentage',10,150,60,500, now() + interval '30 days'),
 ('SAVE50','fixed',50,500,50,1000, now() + interval '60 days'),
 ('LASSI15','percentage',15,100,40,300, now() + interval '14 days'),
 ('FIRST20','percentage',20,200,80,200, now() + interval '90 days');

insert into public.banners (title,subtitle,button_text,button_link) values
 ('Fresh Dairy Products Delivered to Your Door','Fresh Milk, Curd, Paneer, Lassi and More — Delivered Fresh.','Shop Now','/products');
