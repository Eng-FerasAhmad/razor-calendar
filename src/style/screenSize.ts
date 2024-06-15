export const screenSize = {
    xs: '320px',
    sm: '768px',
    md: '1024px',
    lg: '1200px',
};

export const device = {
    mobile: `(min-width: 0), and (max-width: ${screenSize.xs})`,
    tablet: `(min-width: ${screenSize.sm}), and (max-width: ${screenSize.xs})`,
    desktop: `(min-width: ${screenSize.md})`,
};

export const contentWidth = {
    mobile: 320,
    tablet: 768,
    desktop: 900,
};
