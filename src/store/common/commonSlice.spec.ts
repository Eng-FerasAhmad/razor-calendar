import commonReducer, { setAppName } from './commonSlice';

import { CommonState } from './types';

describe('commonSlice', () => {
    const initialState: CommonState = {
        appName: '',
    };

    test('Should handle init value', () => {
        expect(
            commonReducer(
                {
                    appName: '',
                },
                { type: 'unknown' }
            )
        ).toEqual(initialState);
    });

    test('should handle set app name value', () => {
        const common = commonReducer(initialState, setAppName('razor'));
        expect(common.appName).toEqual('razor');
    });
});
