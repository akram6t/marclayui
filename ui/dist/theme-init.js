// src/theme-init.ts
var themeInitScript = `(function(){try{var t=localStorage.getItem("mcl-theme");var m=(t==="light"||t==="dark")?t:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",m);var p=localStorage.getItem("mcl-preset");if(p==="neo"){document.documentElement.setAttribute("data-preset","neo");}}catch(e){}})();`;
export {
  themeInitScript
};
//# sourceMappingURL=theme-init.js.map