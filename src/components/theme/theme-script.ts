/** Apply a saved theme before paint. System theme stays in CSS when unset. */
export const themeScript = `(function(){try{var t=localStorage.getItem("safemind-theme");if(t==="dark"||t==="light"){document.documentElement.classList.add(t);}}catch(e){}})();`;
