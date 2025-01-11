import { DateTime } from 'luxon';
import { ViewType } from 'types/appointment';
import { ToolbarConfig } from 'types/toolbarConfig';

export interface ToolbarProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
    currentDate: DateTime;
    onNavigate: (newDate: DateTime) => void;
    toolbarConfig: Partial<ToolbarConfig>;
}
