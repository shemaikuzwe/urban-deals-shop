import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: process.env.NODE_ENV !== "production",
  tsconfig: "./tsconfig.json",
  external: ["@prisma/adapter-pg", "@prisma/client"],
});
