import { CommonState } from 'src/store/common/types';
import { EventsState } from 'src/store/events/types';
import { UIState } from 'src/store/ui/types';

// Add any new store state to the list:
export interface RootState {
    common: CommonState;
    events: EventsState;
    ui: UIState;
}

// Slice:
export enum SliceName {
    COMMON = 'common',
}
