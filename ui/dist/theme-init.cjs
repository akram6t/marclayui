"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/theme-init.ts
var theme_init_exports = {};
__export(theme_init_exports, {
  themeInitScript: () => themeInitScript
});
module.exports = __toCommonJS(theme_init_exports);
var themeInitScript = `(function(){try{var t=localStorage.getItem("mcl-theme");var m=(t==="light"||t==="dark")?t:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",m);var p=localStorage.getItem("mcl-preset");if(p==="neo"){document.documentElement.setAttribute("data-preset","neo");}}catch(e){}})();`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  themeInitScript
});
//# sourceMappingURL=theme-init.cjs.map