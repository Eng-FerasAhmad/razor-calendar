type ColorInput = string; // HEX or RGB input
type ColorOutput = string; // HEX output

export function darkenColor(color: ColorInput, amount: number): ColorOutput {
    // Helper function to convert HEX to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
        const sanitizedHex = hex.replace('#', '');

        // Ensure the HEX input is valid
        if (sanitizedHex.length !== 6) {
            throw new Error('Invalid HEX color format');
        }

        const r = parseInt(sanitizedHex.slice(0, 2), 16); // Extract the red component
        const g = parseInt(sanitizedHex.slice(2, 4), 16); // Extract the green component
        const b = parseInt(sanitizedHex.slice(4, 6), 16); // Extract the blue component

        return [r, g, b];
    };

    // Helper function to convert RGB to HEX
    const rgbToHex = (r: number, g: number, b: number): string => {
        const componentToHex = (c: number): string =>
            c.toString(16).padStart(2, '0');
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    };

    // Extract RGB components
    let r: number;
    let g: number;
    let b: number;

    if (color.startsWith('#')) {
        [r, g, b] = hexToRgb(color);
    } else if (color.startsWith('rgb')) {
        const rgbMatch = color.match(/\d+/g);
        if (!rgbMatch) throw new Error('Invalid RGB format');
        [r, g, b] = rgbMatch.map(Number);
    } else {
        throw new Error('Invalid color format. Provide HEX or RGB.');
    }

    // Apply darkening
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    // Return as HEX
    return rgbToHex(r, g, b);
}
