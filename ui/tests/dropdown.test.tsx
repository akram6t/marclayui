import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Dropdown, type DropdownItem } from "../src/components/dropdown/dropdown";

const ITEMS: DropdownItem[] = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Gamma", disabled: true },
];

describe("Dropdown", () => {
  it("opens the custom menu on trigger click", () => {
    render(<Dropdown items={ITEMS} placeholder="Pick…" />);
    fireEvent.click(screen.getByRole("button", { name: /pick…/i }));
    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("closes on Escape and keeps the selection flow", () => {
    render(<Dropdown items={ITEMS} defaultValue="a" />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("listbox");
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("selects with Enter during keyboard navigation (skipping disabled)", () => {
    const onChange = vi.fn();
    render(<Dropdown items={ITEMS} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button"));
    const menu = screen.getByRole("listbox");
    // active starts on first enabled (a); ArrowDown moves to b (c is disabled)
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    fireEvent.keyDown(menu, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("multiple mode stays open and reports arrays", () => {
    const onChange = vi.fn();
    render(<Dropdown items={ITEMS} multiple defaultValue={["a"]} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getAllByRole("option")[1]);
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
    expect(screen.getByRole("listbox")).toBeTruthy();
  });
});
