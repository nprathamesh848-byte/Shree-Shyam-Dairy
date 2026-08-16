export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string;
          city: string;
          created_at: string;
          id: string;
          is_default: boolean;
          landmark: string | null;
          mobile: string;
          name: string;
          pincode: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address: string;
          city: string;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          landmark?: string | null;
          mobile: string;
          name: string;
          pincode: string;
          type?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string;
          city?: string;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          landmark?: string | null;
          mobile?: string;
          name?: string;
          pincode?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      banners: {
        Row: {
          button_link: string | null;
          button_text: string | null;
          created_at: string;
          end_date: string | null;
          id: string;
          image: string | null;
          start_date: string;
          status: boolean;
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          image?: string | null;
          start_date?: string;
          status?: boolean;
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          button_link?: string | null;
          button_text?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          image?: string | null;
          start_date?: string;
          status?: boolean;
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string;
          slug: string;
          sort_order: number;
          status: boolean;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name: string;
          slug: string;
          sort_order?: number;
          status?: boolean;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string;
          slug?: string;
          sort_order?: number;
          status?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      coupons: {
        Row: {
          code: string;
          created_at: string;
          discount_type: Database["public"]["Enums"]["discount_type"];
          discount_value: number;
          expiry_date: string | null;
          id: string;
          maximum_discount: number | null;
          minimum_order: number;
          status: boolean;
          updated_at: string;
          usage_limit: number | null;
          used_count: number;
        };
        Insert: {
          code: string;
          created_at?: string;
          discount_type?: Database["public"]["Enums"]["discount_type"];
          discount_value?: number;
          expiry_date?: string | null;
          id?: string;
          maximum_discount?: number | null;
          minimum_order?: number;
          status?: boolean;
          updated_at?: string;
          usage_limit?: number | null;
          used_count?: number;
        };
        Update: {
          code?: string;
          created_at?: string;
          discount_type?: Database["public"]["Enums"]["discount_type"];
          discount_value?: number;
          expiry_date?: string | null;
          id?: string;
          maximum_discount?: number | null;
          minimum_order?: number;
          status?: boolean;
          updated_at?: string;
          usage_limit?: number | null;
          used_count?: number;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          message: string;
          title: string;
          type: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message: string;
          title: string;
          type?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          message?: string;
          title?: string;
          type?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      offers: {
        Row: {
          category_id: string | null;
          coupon_code: string | null;
          created_at: string;
          description: string | null;
          discount_type: Database["public"]["Enums"]["discount_type"];
          discount_value: number;
          end_date: string | null;
          id: string;
          maximum_discount: number | null;
          minimum_order: number;
          name: string;
          start_date: string;
          status: boolean;
          terms: string | null;
          updated_at: string;
        };
        Insert: {
          category_id?: string | null;
          coupon_code?: string | null;
          created_at?: string;
          description?: string | null;
          discount_type?: Database["public"]["Enums"]["discount_type"];
          discount_value?: number;
          end_date?: string | null;
          id?: string;
          maximum_discount?: number | null;
          minimum_order?: number;
          name: string;
          start_date?: string;
          status?: boolean;
          terms?: string | null;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          coupon_code?: string | null;
          created_at?: string;
          description?: string | null;
          discount_type?: Database["public"]["Enums"]["discount_type"];
          discount_value?: number;
          end_date?: string | null;
          id?: string;
          maximum_discount?: number | null;
          minimum_order?: number;
          name?: string;
          start_date?: string;
          status?: boolean;
          terms?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "offers_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      order_counters: {
        Row: {
          counter: number;
          day: string;
        };
        Insert: {
          counter?: number;
          day: string;
        };
        Update: {
          counter?: number;
          day?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string;
          price: number;
          product_id: string | null;
          product_name: string;
          quantity: number;
          subtotal: number;
          variant_id: string | null;
          variant_label: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id: string;
          price?: number;
          product_id?: string | null;
          product_name: string;
          quantity?: number;
          subtotal?: number;
          variant_id?: string | null;
          variant_label: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string;
          price?: number;
          product_id?: string | null;
          product_name?: string;
          quantity?: number;
          subtotal?: number;
          variant_id?: string | null;
          variant_label?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          address_text: string;
          city: string | null;
          coupon_code: string | null;
          created_at: string;
          customer_mobile: string;
          customer_name: string;
          delivery_charge: number;
          delivery_instructions: string | null;
          discount: number;
          email_sent: boolean;
          id: string;
          landmark: string | null;
          order_number: string;
          order_status: Database["public"]["Enums"]["order_status"];
          payment_method: string;
          payment_status: string;
          pincode: string | null;
          status_history: Json;
          subtotal: number;
          total: number;
          updated_at: string;
          user_id: string | null;
          whatsapp_sent: boolean;
        };
        Insert: {
          address_text: string;
          city?: string | null;
          coupon_code?: string | null;
          created_at?: string;
          customer_mobile: string;
          customer_name: string;
          delivery_charge?: number;
          delivery_instructions?: string | null;
          discount?: number;
          email_sent?: boolean;
          id?: string;
          landmark?: string | null;
          order_number: string;
          order_status?: Database["public"]["Enums"]["order_status"];
          payment_method?: string;
          payment_status?: string;
          pincode?: string | null;
          status_history?: Json;
          subtotal?: number;
          total?: number;
          updated_at?: string;
          user_id?: string | null;
          whatsapp_sent?: boolean;
        };
        Update: {
          address_text?: string;
          city?: string | null;
          coupon_code?: string | null;
          created_at?: string;
          customer_mobile?: string;
          customer_name?: string;
          delivery_charge?: number;
          delivery_instructions?: string | null;
          discount?: number;
          email_sent?: boolean;
          id?: string;
          landmark?: string | null;
          order_number?: string;
          order_status?: Database["public"]["Enums"]["order_status"];
          payment_method?: string;
          payment_status?: string;
          pincode?: string | null;
          status_history?: Json;
          subtotal?: number;
          total?: number;
          updated_at?: string;
          user_id?: string | null;
          whatsapp_sent?: boolean;
        };
        Relationships: [];
      };
      product_variants: {
        Row: {
          created_at: string;
          id: string;
          label: string;
          minimum_stock: number;
          mrp: number | null;
          price: number;
          product_id: string;
          quantity: number;
          status: boolean;
          stock: number;
          unit: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label: string;
          minimum_stock?: number;
          mrp?: number | null;
          price?: number;
          product_id: string;
          quantity?: number;
          status?: boolean;
          stock?: number;
          unit?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string;
          minimum_stock?: number;
          mrp?: number | null;
          price?: number;
          product_id?: string;
          quantity?: number;
          status?: boolean;
          stock?: number;
          unit?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          benefits: string | null;
          category_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          ingredients: string | null;
          name: string;
          status: boolean;
          storage_instructions: string | null;
          updated_at: string;
        };
        Insert: {
          benefits?: string | null;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          ingredients?: string | null;
          name: string;
          status?: boolean;
          storage_instructions?: string | null;
          updated_at?: string;
        };
        Update: {
          benefits?: string | null;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          ingredients?: string | null;
          name?: string;
          status?: boolean;
          storage_instructions?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          mobile: string | null;
          name: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          mobile?: string | null;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          mobile?: string | null;
          name?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          key: string;
          updated_at: string;
          value: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: Json;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_admin: { Args: { _user_id: string }; Returns: boolean };
      next_order_number: { Args: never; Returns: string };
    };
    Enums: {
      app_role: "customer" | "admin" | "manager" | "staff";
      discount_type: "percentage" | "fixed";
      order_status:
        "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "admin", "manager", "staff"],
      discount_type: ["percentage", "fixed"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const;
