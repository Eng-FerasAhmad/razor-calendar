import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { CalendarToolbarContainer } from 'calendar/_toolbar/styles';
import { RazorToolbarCompact } from 'components/toolbar/compact-toolbar';

interface Props {
    children?: ReactElement;
}
export default function CalendarToolbar({ children }: Props): ReactElement {
    const { config, onDateChange, onViewChange, selectedDate, view } =
        useCalendarContext();

    return (
        <CalendarToolbarContainer>
            <RazorToolbarCompact
                currentView={view}
                onViewChange={onViewChange}
                currentDate={selectedDate}
                onNavigate={onDateChange}
                config={config}
            />
            {children}
        </CalendarToolbarContainer>
    );
}
