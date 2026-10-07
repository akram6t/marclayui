/** Built-in style presets. Each preset defines its own light AND dark palette
 *  (see styles/theme.css); switching a preset swaps both at once. */
export type PresetName = "clay" | "neo";

export interface PresetInfo {
  id: PresetName;
  label: string;
  description: string;
}

export const PRESETS: PresetInfo[] = [
  {
    id: "clay",
    label: "Claymorphism",
    description: "Warm terracotta clay, squircles, Quicksand — the signature MarclayUI look.",
  },
  {
    id: "neo",
    label: "Neumorphism",
    description: "Soft grey-blue extrusions, violet (light) / gold (dark) accent, circles, Poppins & Manrope.",
  },
];

export const PRESET_STORAGE_KEY = "mcl-preset";

/** Quick primary-color swatches used by ThemeMenu and the docs playground. */
export const COLOR_SWATCHES: Array<{ name: string; color: string }> = [
  { name: "Terra", color: "#e0785a" },
  { name: "Violet", color: "#7c5cff" },
  { name: "Ocean", color: "#4a90d9" },
  { name: "Forest", color: "#5a8a46" },
  { name: "Magenta", color: "#c74f9d" },
];
