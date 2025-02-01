import { DateTime } from 'luxon';
import { ReactElement, useEffect } from 'react';
import Agenda from 'agenda/Agenda';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { LayoutContainer } from 'calendar/_layout/styles';
import Team from 'calendar/team/Team';
import Day from 'day/Day';
import Month from 'month/Month';
import { Appointment, ViewType } from 'types/appointment';
import { TeamModel } from 'types/teamModel';
import Week from 'week/Week';

interface Props {
    selectedDate: DateTime;
    initView: ViewType;
    teamModel: TeamModel;
    handleChangeAppointment: (appointment: Appointment) => void;
}

export default function CalendarLayout({
    selectedDate,
    initView,
    teamModel,
    handleChangeAppointment,
}: Props): ReactElement {
    const { view, onViewChange, config } = useCalendarContext();

    useEffect(() => {
        onViewChange(initView);
    }, [initView, onViewChange]);

    const teamsHasVisibleItems = (): boolean => {
        return teamModel.users.some((user) => user.visible);
    };

    const renderView = (): ReactElement => {
        switch (view) {
            case 'month':
                return (
                    <Month
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'week':
                return (
                    <Week
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'day':
                return (
                    <Day
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            case 'agenda':
                return <Agenda />;
            case 'team':
                return teamsHasVisibleItems() ? (
                    <Team
                        selectedDate={selectedDate}
                        teamModel={teamModel}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                ) : (
                    <Day
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
            default:
                return (
                    <Month
                        selectedDate={selectedDate}
                        handleChangeAppointment={handleChangeAppointment}
                    />
                );
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
