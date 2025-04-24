import { ReactElement } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { CalendarToolbarContainer } from 'calendar/_header-template/styles';
import { Toolbar } from 'src/components/calendar/toolbar';

interface Props {
    children?: ReactElement;
}
export default function HeaderTemplate({ children }: Props): ReactElement {
    const { config, onDateChange, onViewChange, selectedDate, view } =
        useCalendarContext();

    return (
        <CalendarToolbarContainer>
            <Toolbar
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
