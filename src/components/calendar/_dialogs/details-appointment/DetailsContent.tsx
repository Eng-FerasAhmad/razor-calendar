import { Tooltip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
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
    TimeBoxTitle,
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
    const { t } = useTranslation();
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
                <Tooltip title={t('actions.edit', { ns: 'common' })}>
                    <IconWrapper color={color} onClick={handleEdit}>
                        <EditSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.delete', { ns: 'common' })}>
                    <IconWrapper color={color} onClick={onDelete}>
                        <DeleteSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.options', { ns: 'common' })}>
                    <IconWrapper color={color}>
                        <MenuSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.close', { ns: 'common' })}>
                    <IconWrapper color={color} onClick={handleClose}>
                        <CloseSymbol size={18} color="#fff" />
                    </IconWrapper>
                </Tooltip>
            </HeaderBox>

            <TitleBox>
                <CalendarSymbol size={iconSize} />
                <Typography sx={{ fontSize: '16px' }} variant="body1" flex={1}>
                    {title}
                </Typography>
            </TitleBox>

            <DateBox data-testid="date-box">
                <TextBox>
                    <ClockSymbol size={iconSize} />
                    <TimeBoxTitle>{formattedStart}</TimeBoxTitle>
                </TextBox>

                <TextBox>
                    <OutlineClockSymbol size={iconSize} />
                    <TimeBoxTitle>{formattedEnd}</TimeBoxTitle>
                </TextBox>
            </DateBox>

            <ReminderBox>
                <TextBox>
                    <TimerSymbol size={iconSize} />
                    <TimeBoxTitle>{diffInMinutes}</TimeBoxTitle>
                </TextBox>
            </ReminderBox>

            <CalendarBox>
                <TextBox>
                    <UserSymbol size={iconSize} />
                    <TextBoxTitle>
                        {assign || t('actions.notAssign', { ns: 'common' })}
                    </TextBoxTitle>
                </TextBox>
            </CalendarBox>
        </DetailsContentContainer>
    );
}
