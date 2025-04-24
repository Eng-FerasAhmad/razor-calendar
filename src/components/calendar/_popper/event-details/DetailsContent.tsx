import { darken, lighten, Tooltip, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import {
    AddCircleOutline,
    CalendarCheckTwotone,
    ClockOutline,
    CloseOutline,
    DeleteOutline,
    EditOutline,
    MenuOutline,
    TimerBulk,
    UserCardOutline,
} from 'razor-icon-library';
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
import {
    standardDarkColor7,
    standardLightColor4,
} from 'calendar/_style/colors';
import { Appointment } from 'types/appointment';
import { formattedStart } from 'utils/dateFormater';

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
    const { title, start, end, assign, isFullDay } = appointment || {};

    const diffInMinutes = formatTimeDifference(start!, end!, isFullDay!);

    // Format the start and end times
    const startDate = formattedStart(
        start!,
        config.common.dateFormat,
        config.hour.is24HourFormat
    );

    const endDate = formattedStart(
        end!,
        config.common.dateFormat,
        config.hour.is24HourFormat
    );

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

    const getColor = (): string => {
        if (assign && assign.length === 1) {
            return standardLightColor4(assign[0].color);
        }

        return standardLightColor4(config.style.primaryColor);
    };

    return (
        <DetailsContentContainer
            data-testid="details-content-container"
            color={getColor()}
        >
            <HeaderBox data-testid="header-box" color={getColor()}>
                <Tooltip title={t('actions.edit', { ns: 'common' })}>
                    <IconWrapper color={getColor()} onClick={handleEdit}>
                        <EditOutline
                            size={18}
                            color={standardDarkColor7(getColor())}
                        />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.delete', { ns: 'common' })}>
                    <IconWrapper color={getColor()} onClick={onDelete}>
                        <DeleteOutline
                            size={18}
                            color={standardDarkColor7(getColor())}
                        />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.options', { ns: 'common' })}>
                    <IconWrapper color={getColor()}>
                        <MenuOutline
                            size={18}
                            color={standardDarkColor7(getColor())}
                        />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.close', { ns: 'common' })}>
                    <IconWrapper color={getColor()} onClick={handleClose}>
                        <CloseOutline
                            size={18}
                            color={standardDarkColor7(getColor())}
                        />
                    </IconWrapper>
                </Tooltip>
            </HeaderBox>
            <TitleBox>
                <CalendarCheckTwotone size={iconSize} />
                <Typography sx={{ fontSize: '16px' }} variant="body1" flex={1}>
                    {title}
                </Typography>
            </TitleBox>
            <DateBox data-testid="date-box">
                <TextBox>
                    <ClockOutline size={iconSize} />
                    <TimeBoxTitle>{startDate}</TimeBoxTitle>
                </TextBox>

                <TextBox>
                    <ClockOutline size={iconSize} />
                    <TimeBoxTitle>{endDate}</TimeBoxTitle>
                </TextBox>
            </DateBox>
            <ReminderBox>
                <TextBox>
                    <TimerBulk size={iconSize} />
                    <TimeBoxTitle>{diffInMinutes}</TimeBoxTitle>
                </TextBox>
            </ReminderBox>

            {appointment!.reminder && (
                <ReminderBox>
                    <TextBox>
                        <AddCircleOutline size={iconSize} />
                        <TimeBoxTitle>
                            {appointment!.reminder.amount}{' '}
                            {t(`reminder.${appointment!.reminder.unit}`, {
                                ns: 'common',
                            })}
                        </TimeBoxTitle>
                    </TextBox>
                </ReminderBox>
            )}
            <CalendarBox>
                <TextBox>
                    <UserCardOutline size={iconSize} />
                    <TextBoxTitle>
                        {assign && assign[0].id === 'id' && (
                            <>{t('actions.notAssign', { ns: 'common' })}</>
                        )}
                        {assign &&
                            assign[0].id !== 'id' &&
                            assign.map((user) => {
                                return (
                                    <Chip
                                        key={user.id}
                                        label={`${user.firstName} ${user.lastName}`}
                                        size={'small'}
                                        sx={{
                                            marginRight: '2px',
                                            bgcolor: lighten(user.color, 0.6),
                                            color: darken(user.color, 0.4),
                                            fontSize: '12px',
                                        }}
                                    />
                                );
                            })}
                    </TextBoxTitle>
                </TextBox>
            </CalendarBox>
        </DetailsContentContainer>
    );
}
