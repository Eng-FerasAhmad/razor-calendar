import { Avatar, Tooltip } from '@mui/material';
import {
    ClockOutline,
    ClockTwotone,
    CloseOutline,
    CoffeeOutline,
    DeleteOutline,
    EditOutline,
    MenuOutline,
    NotesOutline,
    TimerOutline,
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
    NotesBoxTitle,
    NoteContentBox,
    ServiceBoxTitle,
    ServiceContentBox,
} from './styles';
import { formatTimeDifference } from 'calendar/_config/utils';
import { useCalendarContext } from 'calendar/_context/CalendarContext';

import { Appointment } from 'types/appointment';
import { getFallbackLetters } from 'utils/common';
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
        notes,
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

            <ServiceContentBox>
                {services && (
                    <TextBox>
                        <CoffeeOutline size={iconSize} color={staffer?.color} />
                        <ServiceBoxTitle>
                            {services[0].serviceName}
                        </ServiceBoxTitle>
                    </TextBox>
                )}
            </ServiceContentBox>

            <DetailsWrapper>
                <ContentBox data-testid="content-box-dates">
                    <TextBox>
                        <ClockOutline size={iconSize} color={staffer?.color} />
                        <TimeBoxTitle>{startDate}</TimeBoxTitle>
                    </TextBox>

                    <TextBox>
                        <ClockTwotone size={iconSize} color={staffer?.color} />
                        <TimeBoxTitle>{endDate}</TimeBoxTitle>
                    </TextBox>

                    <TextBox>
                        <TimerOutline size={iconSize} color={staffer?.color} />
                        <TimeBoxTitle>{diffInMinutes}</TimeBoxTitle>
                    </TextBox>
                </ContentBox>

                <ContentBox data-testid="content-box-avatar">
                    <AvatarBox>
                        <Avatar
                            src={staffer?.image}
                            alt={`${staffer?.firstName} ${staffer?.lastName}`}
                            sx={{
                                width: 45,
                                height: 45,
                                bgcolor: staffer?.color,
                                fontSize: 16,
                            }}
                        >
                            {getFallbackLetters(staffer!)}
                        </Avatar>
                        <TextBox>
                            <AvatarNameTypography variant="body1">
                                {staffer?.firstName}
                            </AvatarNameTypography>
                        </TextBox>
                    </AvatarBox>
                </ContentBox>
            </DetailsWrapper>

            {notes && (
                <NoteContentBox>
                    <TextBox>
                        <NotesOutline size={iconSize} color={staffer?.color} />
                        <NotesBoxTitle>{notes}</NotesBoxTitle>
                    </TextBox>
                </NoteContentBox>
            )}

            {showInfo && (
                <ContentBox>
                    <CreatedBox>
                        {created && (
                            <TitleUpdateDate>
                                {t('actions.created', { ns: 'common' })}:{' '}
                                {createdDate}
                            </TitleUpdateDate>
                        )}

                        {updated && (
                            <TitleUpdateDate>
                                {t('actions.updated', { ns: 'common' })}:{' '}
                                {updatedDate}
                            </TitleUpdateDate>
                        )}
                    </CreatedBox>
                </ContentBox>
            )}
        </DetailsContentContainer>
    );
}
