import { FetchArgs } from '@reduxjs/toolkit/query';
import { CommonState } from 'src/store/common/types';

export type ApiFetchArgs = FetchArgs;

// Add any new store state to the list:
export interface RootState {
    common: CommonState;
}

// Slice:
export enum SliceName {
    COMMON = 'common',
}
