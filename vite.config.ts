import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    nitro({
      preset: "vercel",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": "/src",
    },
  },
  ssr: {
    noExternal: ["tslib", "@supabase/functions-js", "@supabase/supabase-js", "@supabase/auth-js", "@supabase/postgrest-js", "@supabase/storage-js", "@supabase/realtime-js"],
  },
});
