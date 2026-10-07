import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MarclayProvider, Button, Badge, ThemeMenu } from "../src";

describe("MarclayProvider", () => {
  it("applies runtime color overrides including derived shades", () => {
    render(
      <MarclayProvider colors={{ primary: "#7c5cff" }}>
        <div>child</div>
      </MarclayProvider>
    );
    const style = document.documentElement.style;
    expect(style.getPropertyValue("--mcl-primary")).toBe("#7c5cff");
    // -2 is a lightened gradient stop, -deep a darkened text tone — both derived
    expect(style.getPropertyValue("--mcl-primary-2")).not.toBe("");
    expect(style.getPropertyValue("--mcl-primary-deep")).not.toBe("");
    expect(style.getPropertyValue("--mcl-clay-p")).toContain("inset");
  });

  it("ThemeMenu preset chip switches the attribute and clears custom colors", async () => {
    render(
      <MarclayProvider colors={{ primary: "#123456" }}>
        <ThemeMenu />
      </MarclayProvider>
    );
    expect(document.documentElement.style.getPropertyValue("--mcl-primary")).toBe("#123456");
    fireEvent.click(document.querySelector(".mcl-theme-menu-shell .mcl-theme-toggle") as HTMLElement);
    const neoChip = await waitFor(() => {
      const chip = [...document.querySelectorAll(".mcl-theme-menu-chip")].find((c) =>
        c.textContent?.includes("Neumorphism")
      );
      if (!chip) throw new Error("chips not rendered");
      return chip;
    });
    fireEvent.click(neoChip);
    await waitFor(() =>
      expect(document.documentElement.getAttribute("data-preset")).toBe("neo")
    );
    // preset switch resets custom colors — the inline primary is gone
    expect(document.documentElement.style.getPropertyValue("--mcl-primary")).toBe("");
  });
});

describe("components", () => {
  it("Button renders an anchor when href is given", () => {
    render(<Button href="/docs" variant="primary">Docs</Button>);
    const a = screen.getByRole("link", { name: "Docs" });
    expect(a.getAttribute("href")).toBe("/docs");
    expect(a.className).toContain("mcl-btn-primary");
  });

  it("Badge solid variant exposes plain CSS classes (no inline shadows)", () => {
    const { container } = render(<Badge solid variant="secondary">v</Badge>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("mcl-badge-solid");
    expect(el.className).toContain("mcl-badge-secondary");
    expect(el.getAttribute("style")).toBeNull();
  });

  it("ThemeMenu exposes a trigger and opens the customization panel", async () => {
    render(
      <MarclayProvider>
        <ThemeMenu />
      </MarclayProvider>
    );
    const trigger = document.querySelector(".mcl-theme-menu-shell .mcl-theme-toggle") as HTMLElement;
    expect(trigger).toBeTruthy();
    fireEvent.click(trigger);
    await waitFor(() => expect(document.querySelector(".mcl-theme-menu")).toBeTruthy());
    const chips = [...document.querySelectorAll(".mcl-theme-menu-chip")];
    expect(chips.some((c) => c.textContent?.includes("Neumorphism"))).toBe(true);
  });
});
