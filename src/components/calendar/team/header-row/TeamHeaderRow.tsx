import { Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DateTime } from 'luxon';
import { ArrowDownOutline } from 'razor-icon-library';
import { ReactElement } from 'react';
import FullDaysAppointment from 'calendar/_atomic/display-appointment/full-days-appointment/FullDaysAppointment';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    NameWrapper,
    TeamDayHeaderWrapper,
    TeamDayNumberWrapper,
} from 'calendar/team/header-row/styles';
import { Appointment } from 'types/appointment';
import { TeamModel } from 'types/teamModel';
import { getFallbackLetters } from 'utils/common';
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
                                    sx={{
                                        bgcolor: user.color,
                                        fontSize: 16,
                                    }}
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
                            <ArrowDownOutline
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
                                    fullDay.teamMember &&
                                    fullDay.teamMember.some(
                                        (assignee) => assignee.id === user.id
                                    )
                            );

                        return (
                            <FullDaysAppointment
                                key={user.id}
                                fullDayAppointments={userFullDayAppointments}
                                days={[selectedDate]}
                            />
                        );
                    })}
            </WeekHeaderFullDaysRowWrapper>
        </WeekHeaderRowContainer>
    );
}
