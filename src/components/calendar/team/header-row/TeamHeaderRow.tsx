import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import FullDaysAppointment from 'calendar/_atomic/display-appointment/full-days-appointment/FullDaysAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    TeamDayHeaderWrapper,
    TeamDayNumberWrapper,
} from 'calendar/team/header-row/styles';
import { TeamUser } from 'calendar/team/types';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
import { Appointment } from 'types/appointment';
import {
    WeekHeaderRowContainer,
    GmtWrapper,
    WidthSpaceWrapper,
    WeekHeaderDaysRowWrapper,
    WeekHeaderFullDaysRowWrapper,
    IconDownWrapper,
} from 'week/header-row/styles';

interface Props {
    fullDayAppointments: Appointment[];
    selectedDate: DateTime;
    users: TeamUser[];
}

export default function TeamHeaderRow({
    fullDayAppointments,
    selectedDate,
    users,
}: Props): ReactElement {
    const { fullDaysCount, showAllFullDays, onShowAllFullDays } =
        useCalendarContext();

    // Use the theme object
    const theme = useTheme();

    const handleToggle = (): void => onShowAllFullDays();

    const getFallbackLetters = (user: TeamUser): string => {
        const f = user.firstName?.trim() || '';
        const l = user.lastName?.trim() || '';
        const firstLetter = f.charAt(0).toUpperCase();
        const lastLetter = l.charAt(0).toUpperCase();

        return `${firstLetter}${lastLetter}`;
    };

    return (
        <WeekHeaderRowContainer data-testid="week-header-row">
            <WeekHeaderDaysRowWrapper data-testid="week-header-days-row">
                <WidthSpaceWrapper data-testid="width-space-wrapper"></WidthSpaceWrapper>

                {users.map((user) => (
                    <TeamDayHeaderWrapper
                        key={user.id}
                        data-testid="team-day-header"
                    >
                        <TeamDayNumberWrapper>
                            <Avatar
                                src={user.image}
                                sx={{ bgcolor: user.color, fontSize: 16 }}
                            >
                                {getFallbackLetters(user)}
                            </Avatar>
                            <span>{`${user.firstName} ${user.lastName}`}</span>
                        </TeamDayNumberWrapper>
                    </TeamDayHeaderWrapper>
                ))}
            </WeekHeaderDaysRowWrapper>
            <WeekHeaderFullDaysRowWrapper data-testid="week-header-full-days-row-wrapper">
                <GmtWrapper data-testid="gmt-wrapper">
                    <div>GMT +{DateTime.now().offset / 60}</div>
                    {fullDaysCount > 2 && (
                        <IconDownWrapper
                            isOpen={showAllFullDays}
                            onClick={handleToggle}
                        >
                            <ArrowDownSymbol
                                size={16}
                                color={theme.palette.text.primary}
                            />
                        </IconDownWrapper>
                    )}
                </GmtWrapper>

                <FullDaysAppointment
                    fullDayAppointments={fullDayAppointments}
                    days={[selectedDate]}
                />
            </WeekHeaderFullDaysRowWrapper>
        </WeekHeaderRowContainer>
    );
}
