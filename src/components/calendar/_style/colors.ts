import { darken, lighten } from '@mui/material';

// dark colors:
export const standardDarkColor2 = (color: string): string => {
    return darken(color, 0.2);
};

export const standardDarkColor4 = (color: string): string => {
    return darken(color, 0.4);
};

export const standardDarkColor7 = (color: string): string => {
    return darken(color, 0.7);
};

export const standardDarkColor8 = (color: string): string => {
    return darken(color, 0.8);
};

// light colors:
export const standardLightColor2 = (color: string): string => {
    return lighten(color, 0.2);
};

export const standardLightColor4 = (color: string): string => {
    return lighten(color, 0.4);
};

export const standardLightColor5 = (color: string): string => {
    return lighten(color, 0.5);
};

export const standardLightColor6 = (color: string): string => {
    return lighten(color, 0.6);
};

export const standardLightColor7 = (color: string): string => {
    return lighten(color, 0.7);
};
