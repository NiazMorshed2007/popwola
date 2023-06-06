export function convertCSSToStyles(cssString: string): React.CSSProperties {
  const cssStyles = JSON.parse(cssString);
  const styles: any = {};

  for (const key in cssStyles) {
    const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) =>
      letter.toUpperCase()
    );
    styles[camelCaseKey] = cssStyles[key];
  }

  return styles;
}
