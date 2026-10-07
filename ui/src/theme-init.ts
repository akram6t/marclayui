/**
 * Inline script for <head>/<body>: applies the stored theme + style preset
 * before first paint (no flash of the wrong theme). Kept in its own module so
 * it stays importable from Server Components.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("mcl-theme");var m=(t==="light"||t==="dark")?t:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",m);var p=localStorage.getItem("mcl-preset");if(p==="neo"){document.documentElement.setAttribute("data-preset","neo");}}catch(e){}})();`;
