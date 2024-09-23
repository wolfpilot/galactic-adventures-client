import path from "path"
import { defineConfig } from "vitest/config"
import pluginReact from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [pluginReact()],
  /**
   * By default, Vite-generated CSS classnames lack the module prefix which can be
   * confusing while debugging.
   *
   * There are two simple solutions, one the config below, the other the plugin.
   * Unfortunately the plugin breaks the composes property, so for now it's a no-go.
   *
   * @see https://github.com/teplostanski/vite-plugin-pretty-module-classnames
   */
  css: {
    modules: {
      generateScopedName: "[name]__[local]_[hash:base64:5]",
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@ts": path.resolve(__dirname, "./src/types"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./__mocks__/setup.ts",
    globals: true,
  },
})
