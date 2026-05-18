import { beforeEach, describe, expect, it } from "vitest";

// Test the theme utility functions directly
describe("Theme utilities", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.cssText = "";
  });

  describe("loadSavedTheme", () => {
    it("does nothing when no active theme", async () => {
      const { loadSavedTheme } = await import("../components/ThemeEditor");
      loadSavedTheme();
      // No CSS vars should be set
      expect(document.documentElement.style.getPropertyValue("--accent")).toBe("");
    });

    it("applies theme when active theme exists", async () => {
      const themes = [
        {
          id: "test-theme",
          name: "Test",
          colors: { "--accent": "#ff0000", "--bg-primary": "#000000" },
        },
      ];
      localStorage.setItem("hotline-custom-themes", JSON.stringify(themes));
      localStorage.setItem("hotline-active-theme", "test-theme");

      const { loadSavedTheme } = await import("../components/ThemeEditor");
      loadSavedTheme();

      expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#ff0000");
      expect(document.documentElement.style.getPropertyValue("--bg-primary")).toBe("#000000");
    });

    it("sets accent-rgb when accent color is applied", async () => {
      const themes = [
        {
          id: "rgb-theme",
          name: "RGB Test",
          colors: { "--accent": "#ff8800" },
        },
      ];
      localStorage.setItem("hotline-custom-themes", JSON.stringify(themes));
      localStorage.setItem("hotline-active-theme", "rgb-theme");

      const { loadSavedTheme } = await import("../components/ThemeEditor");
      loadSavedTheme();

      expect(document.documentElement.style.getPropertyValue("--accent-rgb")).toBe("255, 136, 0");
    });

    it("does nothing when theme id not found in saved themes", async () => {
      localStorage.setItem("hotline-custom-themes", JSON.stringify([]));
      localStorage.setItem("hotline-active-theme", "nonexistent");

      const { loadSavedTheme } = await import("../components/ThemeEditor");
      loadSavedTheme();

      expect(document.documentElement.style.getPropertyValue("--accent")).toBe("");
    });
  });
});
