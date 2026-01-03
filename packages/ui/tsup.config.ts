import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.tsx", "src/**/*.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: process.env.NODE_ENV !== "production",
  clean: true,
  outDir: "dist",
  external: ["react", "react-dom"],
  tsconfig: "./tsconfig.json",
});
