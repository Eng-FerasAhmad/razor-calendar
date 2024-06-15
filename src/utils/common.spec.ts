import { pixelToRem } from './common';

describe('common Utils', () => {
    describe('common', () => {
        test('pixelToRem', () => {
            expect(pixelToRem(10)).toBe('0.625rem');
            expect(pixelToRem(10, 10)).toBe('0.625rem 0.625rem');
            expect(pixelToRem(10, 10, 10)).toBe('0.625rem 0.625rem 0.625rem');
            expect(pixelToRem(10, 10, 10, 10)).toBe(
                '0.625rem 0.625rem 0.625rem 0.625rem'
            );
        });
    });
});
