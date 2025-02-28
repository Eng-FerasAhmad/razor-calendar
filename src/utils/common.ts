import { TeamMember } from 'types/teamModel';

const exchangeToRem = (pixel: number, base = 16): string =>
    `${pixel / base}rem`;

export const pixelToRem = (...pixel: Array<number>): string =>
    pixel.map((px: number) => exchangeToRem(px)).join(' ');

export const getFallbackLetters = (user: TeamMember): string => {
    const f = user.firstName?.trim() || '';
    const l = user.lastName?.trim() || '';
    const firstLetter = f.charAt(0).toUpperCase();
    const lastLetter = l.charAt(0).toUpperCase();

    return `${firstLetter}${lastLetter}`;
};
