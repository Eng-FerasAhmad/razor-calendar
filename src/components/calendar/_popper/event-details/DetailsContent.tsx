import { Avatar, Tooltip } from '@mui/material';
import {
    ClockOutline,
    ClockTwotone,
    CloseOutline,
    DeleteOutline,
    EditOutline,
    MenuOutline,
    TimerBulk,
    WizardTwotone,
} from 'razor-icon-library';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DetailsContentContainer,
    IconWrapper,
    HeaderBox,
    TextBox,
    TimeBoxTitle,
    ContentBox,
    TitleTypography,
    DetailsWrapper,
    AvatarBox,
    TitleUpdateDate,
    ColorBox,
    CreatedBox,
    AvatarNameTypography,
} from './styles';
import { formatTimeDifference } from 'calendar/_config/utils';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

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
    const [showInfo, setShowInfo] = useState(false);
    const { appointment } = popperAppointment || {};
    const {
        title,
        start,
        end,
        staffer,
        isFullDay,
        created,
        updated,
        services,
    } = appointment || {};

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

    const createdDate = formattedStart(
        created!,
        config.common.dateFormat,
        config.hour.is24HourFormat
    );

    const updatedDate = formattedStart(
        updated!,
        config.common.dateFormat,
        config.hour.is24HourFormat
    );

    const handleClose = (): void => {
        onPopperAppointment(undefined);
    };

    const onDelete = (): void => {
        if (!appointment) return;

        const updatedAppointment: Appointment = {
            id: appointment.id,
            title: appointment.title,
            start: appointment.start,
            end: appointment.end,
        };
        onDeleteAppointment(updatedAppointment);
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
        <DetailsContentContainer data-testid="details-content-container">
            <HeaderBox data-testid="header-box">
                <Tooltip title={t('actions.edit', { ns: 'common' })}>
                    <IconWrapper onClick={handleEdit} color={staffer?.color}>
                        <EditOutline size={18} />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.delete', { ns: 'common' })}>
                    <IconWrapper onClick={onDelete} color={staffer?.color}>
                        <DeleteOutline size={18} />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.info', { ns: 'common' })}>
                    <IconWrapper
                        onClick={() => setShowInfo(!showInfo)}
                        color={staffer?.color}
                    >
                        <MenuOutline size={18} />
                    </IconWrapper>
                </Tooltip>

                <Tooltip title={t('actions.close', { ns: 'common' })}>
                    <IconWrapper onClick={handleClose} color={staffer?.color}>
                        <CloseOutline size={18} />
                    </IconWrapper>
                </Tooltip>
            </HeaderBox>

            <ContentBox>
                <TextBox>
                    <ColorBox color={staffer?.color} />
                    <TitleTypography variant="body1">{title}</TitleTypography>
                </TextBox>
            </ContentBox>

            <DetailsWrapper>
                <ContentBox data-testid="content-box-dates">
                    {services && (
                        <TextBox>
                            <WizardTwotone size={iconSize} />
                            <TimeBoxTitle>
                                {services[0].serviceName}
                            </TimeBoxTitle>
                        </TextBox>
                    )}

                    <TextBox>
                        <ClockOutline size={iconSize} />
                        <TimeBoxTitle>{startDate}</TimeBoxTitle>
                    </TextBox>

                    <TextBox>
                        <ClockTwotone size={iconSize} />
                        <TimeBoxTitle>{endDate}</TimeBoxTitle>
                    </TextBox>

                    <TextBox>
                        <TimerBulk size={iconSize} />
                        <TimeBoxTitle>{diffInMinutes}</TimeBoxTitle>
                    </TextBox>
                </ContentBox>

                <ContentBox data-testid="content-box-avatar">
                    <AvatarBox>
                        <Avatar
                            src={staffer?.image}
                            alt={`${staffer?.firstName} ${staffer?.lastName}`}
                            sx={{ width: 45, height: 45 }}
                        />
                        <TextBox>
                            <AvatarNameTypography variant="body1">
                                {staffer?.firstName}
                            </AvatarNameTypography>
                        </TextBox>
                    </AvatarBox>
                </ContentBox>
            </DetailsWrapper>

            {showInfo && (
                <ContentBox>
                    <CreatedBox>
                        <TitleUpdateDate>
                            {t('actions.created', { ns: 'common' })}:{' '}
                            {createdDate}
                        </TitleUpdateDate>

                        <TitleUpdateDate>
                            {t('actions.updated', { ns: 'common' })}:{' '}
                            {updatedDate}
                        </TitleUpdateDate>
                    </CreatedBox>
                </ContentBox>
            )}
        </DetailsContentContainer>
    );
}
