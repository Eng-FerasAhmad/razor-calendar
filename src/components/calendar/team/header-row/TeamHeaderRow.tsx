import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import FullDaysAppointment from 'calendar/_atomic/display-appointment/full-days-appointment/FullDaysAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    NameWrapper,
    TeamDayHeaderWrapper,
    TeamDayNumberWrapper,
} from 'calendar/team/header-row/styles';
import ArrowDownSymbol from 'components/shared/icons/arrow-down/ArrowDownSymbol';
import { Appointment } from 'types/appointment';
import { TeamMember, TeamModel } from 'types/teamModel';
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
    teamModel: TeamModel;
}

export default function TeamHeaderRow({
    fullDayAppointments,
    selectedDate,
    teamModel,
}: Props): ReactElement {
    const { fullDaysCount, showAllFullDays, onShowAllFullDays } =
        useCalendarContext();

    // Use the theme object
    const theme = useTheme();

    const handleToggle = (): void => onShowAllFullDays();

    const getFallbackLetters = (user: TeamMember): string => {
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

                {teamModel.users
                    .filter((item) => item.visible)
                    .map((user) => (
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
                                <NameWrapper
                                    active={user.notAvailable || user.isPassive}
                                >{`${user.firstName} ${teamModel.showLastName ? user.lastName : ''}`}</NameWrapper>
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

                {teamModel.users
                    .filter((item) => item.visible)
                    .map((user) => {
                        const userFullDayAppointments =
                            fullDayAppointments.filter(
                                (fullDay) =>
                                    fullDay.assign &&
                                    fullDay.assign.some(
                                        (assignee) => assignee.id === user.id
                                    )
                            );

                        return (
                            <FullDaysAppointment
                                key={user.id}
                                fullDayAppointments={userFullDayAppointments}
                                days={[selectedDate]}
                                userId={user.id}
                            />
                        );
                    })}
            </WeekHeaderFullDaysRowWrapper>
        </WeekHeaderRowContainer>
    );
}
