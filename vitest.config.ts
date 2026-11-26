import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["test/unit/**/*.test.ts", "test/unit/**/*.test.tsx"],
    exclude: ["node_modules", ".next", "test/e2e/**"],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "src/features/team-generator/utils/**/*.ts",
        "src/features/team-generator/store/**/*.ts",
      ],
      exclude: ["**/*.d.ts"],
    },
  },
});
