import { CommonState } from 'src/store/common/types';

// Add any new store state to the list:
export interface RootState {
    common: CommonState;
}

// Slice:
export enum SliceName {
    COMMON = 'common',
}
