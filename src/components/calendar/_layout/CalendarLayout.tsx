import { ReactElement, useEffect } from 'react';
import Agenda from 'agenda/Agenda';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { LayoutContainer } from 'calendar/_layout/styles';
import Team from 'calendar/team/Team';
import YearView from 'calendar/year/Year';
import Day from 'day/Day';
import Month from 'month/Month';
import { ViewType } from 'types/appointment';
import Week from 'week/Week';

interface Props {
    initView: ViewType;
}

export default function CalendarLayout({ initView }: Props): ReactElement {
    const { view, onViewChange, config, teamModel } = useCalendarContext();

    useEffect(() => {
        onViewChange(initView);
    }, [initView, onViewChange]);

    const teamsHasVisibleItems = (): boolean => {
        return teamModel!.users.some((user) => user.visible);
    };

    const renderView = (): ReactElement => {
        switch (view) {
            case 'month':
                return <Month />;
            case 'week':
                return <Week />;
            case 'day':
                return <Day />;
            case 'agenda':
                return <Agenda />;
            case 'year':
                return <YearView />;
            case 'team':
                return teamsHasVisibleItems() ? <Team /> : <Day />;
            default:
                return <Month />;
        }
    };

    return (
        <LayoutContainer
            top={config.style.topStartFrom}
            id="calendar-layout"
            data-testid="calendar-layout"
        >
            {renderView()}
        </LayoutContainer>
    );
}
