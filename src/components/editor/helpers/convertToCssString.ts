export function convertStylesToCSS(styles: any) {
  const cssStyles: any = {};

  for (const key in styles) {
    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    cssStyles[cssKey] = styles[key];
  }

  return JSON.stringify(cssStyles);
}
