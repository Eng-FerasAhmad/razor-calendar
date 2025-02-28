import { Avatar, AvatarGroup } from '@mui/material';
import { DateTime } from 'luxon';
import { MouseEvent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import {
    EventItemContainer,
    EventIndicator,
    EventTime,
    EventTitle,
    LeftSectionWrapper,
    RightSectionWrapper,
} from 'calendar/agenda/styles';
import { Appointment } from 'types/appointment';
import { getFallbackLetters } from 'utils/common';

interface Props {
    appointment: Appointment;
    lang: string;
}

export default function EventItem({ appointment, lang }: Props): ReactElement {
    const { t } = useTranslation();
    const { onPopperAppointment } = useCalendarContext();

    const multiAssignees =
        Array.isArray(appointment.assign) && appointment.assign.length > 1;

    const color = multiAssignees
        ? appointment.color
        : appointment.assign![0].color;

    const popperHandler = (event: MouseEvent<HTMLElement>): void => {
        onPopperAppointment({
            open: true,
            id: 'id',
            anchorEl: event.currentTarget,
            appointment,
        });
    };

    return (
        <EventItemContainer
            onClick={popperHandler}
            data-testid="event-item-container"
        >
            <LeftSectionWrapper>
                <EventIndicator color={color || '#445e4'} />
                <EventTime>
                    {appointment.isFullDay
                        ? t('agenda.fullDay')
                        : `${DateTime.fromISO(appointment.start).setLocale(lang).toFormat('HH:mm')} - ${DateTime.fromISO(appointment.end).setLocale(lang).toFormat('HH:mm')}`}
                </EventTime>
                <EventTitle>{appointment.title}</EventTitle>
            </LeftSectionWrapper>
            <RightSectionWrapper>
                <AvatarGroup max={4}>
                    {appointment.assign!.map((user) => {
                        return (
                            <Avatar
                                key={user.id}
                                src={user.image}
                                sx={{
                                    bgcolor: user.color,
                                    fontSize: 12,
                                    width: 24,
                                    height: 24,
                                }}
                            >
                                {getFallbackLetters(user)}
                            </Avatar>
                        );
                    })}
                </AvatarGroup>
            </RightSectionWrapper>
        </EventItemContainer>
    );
}
