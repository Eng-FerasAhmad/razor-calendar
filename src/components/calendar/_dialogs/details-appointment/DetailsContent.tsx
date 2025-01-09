import { Tooltip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import {
    DetailsContentContainer,
    IconWrapper,
    HeaderBox,
    ReminderBox,
    CalendarBox,
    TitleBox,
    DateBox,
    TextBox,
    TextBoxTitle,
} from './styles';
import { formatTimeDifference } from 'calendar/_config/utils';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import CalendarSymbol from 'components/shared/icons/calendar/CalendarSymbol';
import ClockSymbol from 'components/shared/icons/clock/ClockSymbol';
import OutlineClockSymbol from 'components/shared/icons/clock-outline/OutlineClockSymbol';
import CloseSymbol from 'components/shared/icons/close/CloseSymbol';
import DeleteSymbol from 'components/shared/icons/delete/DeleteSymbol';
import EditSymbol from 'components/shared/icons/edit/EditSymbol';
import MenuSymbol from 'components/shared/icons/menu/MenuSymbol';
import TimerSymbol from 'components/shared/icons/timer/TimerSymbol';
import { UserSymbol } from 'components/shared/icons/user/UserSymbol';
import { Appointment } from 'types/appointment';

export default function DetailsContent(): ReactElement {
    const {
        popperAppointment,
        onPopperAppointment,
        config,
        onDeleteAppointment,
        onDialogAppointment,
    } = useCalendarContext();

    const iconSize = 20;
    const { appointment } = popperAppointment || {};
    const { title, start, end, color, assign, isFullDay } = appointment || {};
    const { dateFormat } = config.common;

    const diffInMinutes = formatTimeDifference(start!, end!, isFullDay!);

    // Format the start and end times
    const formattedStart = start
        ? DateTime.fromISO(start).toFormat(`${dateFormat} HH:mm`)
        : null;
    const formattedEnd = end
        ? DateTime.fromISO(end).toFormat(`${dateFormat} HH:mm`)
        : null;

    const handleClose = (): void => {
        onPopperAppointment(undefined);
    };

    const onDelete = (): void => {
        if (!appointment) return;

        const updated: Appointment = {
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
        };
        onDeleteAppointment(updated);
    };

    const handleEdit = (): void => {
        handleClose();
        onDialogAppointment({
            open: true,
            slotId: '',
            appointment,
        });
    };

    return (
        <DetailsContentContainer
            data-testid="details-content-container"
            color={color || '#ccc'}
        >
            <HeaderBox data-testid="header-box" color={color}>
                <Tooltip title={'Edit'}>
                    <IconWrapper color={color} onClick={handleEdit}>
                        <EditSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={'Delete'}>
                    <IconWrapper color={color} onClick={onDelete}>
                        <DeleteSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={'Options'}>
                    <IconWrapper color={color}>
                        <MenuSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={'Close'}>
                    <IconWrapper color={color} onClick={handleClose}>
                        <CloseSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>
            </HeaderBox>

            <TitleBox>
                <CalendarSymbol size={iconSize} />
                <Typography variant="body1" flex={1}>
                    {title}
                </Typography>
            </TitleBox>

            <DateBox data-testid="date-box">
                <TextBox>
                    <ClockSymbol size={iconSize} />
                    <TextBoxTitle>{formattedStart}</TextBoxTitle>
                </TextBox>

                <TextBox>
                    <OutlineClockSymbol size={iconSize} />
                    <TextBoxTitle>{formattedEnd}</TextBoxTitle>
                </TextBox>
            </DateBox>

            <ReminderBox>
                <TextBox>
                    <TimerSymbol size={iconSize} />
                    <TextBoxTitle>{diffInMinutes}</TextBoxTitle>
                </TextBox>
            </ReminderBox>

            <CalendarBox>
                <TextBox>
                    <UserSymbol size={iconSize} />
                    <TextBoxTitle>{assign || 'No Assign'}</TextBoxTitle>
                </TextBox>
            </CalendarBox>
        </DetailsContentContainer>
    );
}
