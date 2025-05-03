import { darken, lighten } from '@mui/material';

// dark colors:
export const standardDarkColor4 = (color: string): string => {
    return darken(color, 0.4);
};

// light colors:
export const standardLightColor6 = (color: string): string => {
    return lighten(color, 0.6);
};

export const standardLightColor7 = (color: string): string => {
    return lighten(color, 0.7);
};
