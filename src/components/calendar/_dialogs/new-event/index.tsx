import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ActionButtons from './ActionButtons';
import EndDate from './EndDate';
import NotesInput from './NotesInput';
import StartDate from './StartDate';
import { ContentContainer, RowReminderWrapper } from './styles';
import TitleInput from './TitleInput';
import { useNewAppointmentData } from './useNewAppointmentData';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import AssignLIst from 'calendar/_dialogs/new-event/AssignList';
import FullDaySwitch from 'calendar/_dialogs/new-event/FullDaySwitch';
import { DialogCustom } from 'components/shared/dialog/Dialog';

import ReminderSelect from 'components/shared/reminder-select/ReminderSelect';
import SelectColor from 'components/shared/select-color/SelectColor';

export default function NewEventIndex(): ReactElement {
    const {
        title,
        notes,
        fromTime,
        toTime,
        isFullDay,
        color,
        is24Hours,
        dateFormat,
        titleRequired,
        reminder,
        assign,
        handleSave,
        handleFromTimeChange,
        handleToTimeChange,
        handleFromDateChange,
        handleToDateChange,
        handleTitleChange,
        handleNotesChange,
        handleAssignChange,
        setIsFullDay,
        setFromTime,
        setColor,
        setReminder,
        toTimeError,
        toDateError,
        titleError,
        isSaveDisabled,
    } = useNewAppointmentData();

    const { t } = useTranslation();
    const { dialogAppointment, onDialogAppointment, teamModel } =
        useCalendarContext();

    const handleCloseDialog = (): void => {
        onDialogAppointment(undefined);
    };

    return (
        <DialogCustom
            title={t('add.header', { ns: 'common' })}
            description={t('add.description', { ns: 'common' })}
            open={dialogAppointment?.open || false}
            handleClose={handleCloseDialog}
        >
            <ContentContainer data-testid="new-appointment-content">
                <TitleInput
                    title={title}
                    titleError={titleError}
                    titleRequired={titleRequired}
                    onChange={handleTitleChange}
                />

                <RowReminderWrapper>
                    <StartDate
                        fromTime={fromTime}
                        isFullDay={isFullDay}
                        dateFormat={dateFormat}
                        is24Hours={is24Hours}
                        setFromTime={setFromTime}
                        handleFromDateChange={handleFromDateChange}
                        handleFromTimeChange={handleFromTimeChange}
                    />

                    <EndDate
                        toTime={toTime}
                        isFullDay={isFullDay}
                        dateFormat={dateFormat}
                        is24Hours={is24Hours}
                        color={color}
                        toDateError={toDateError}
                        toTimeError={toTimeError}
                        setColor={setColor}
                        handleToDateChange={handleToDateChange}
                        handleToTimeChange={handleToTimeChange}
                    />
                    <FullDaySwitch
                        isFullDay={isFullDay}
                        onChange={setIsFullDay}
                    />
                </RowReminderWrapper>

                <RowReminderWrapper>
                    <ReminderSelect value={reminder} onChange={setReminder} />
                    <SelectColor value={color} onChange={setColor} />
                </RowReminderWrapper>

                <AssignLIst
                    teamList={teamModel?.users}
                    assign={assign}
                    onChange={handleAssignChange}
                />

                <NotesInput notes={notes} onChange={handleNotesChange} />

                <ActionButtons
                    handleClose={handleCloseDialog}
                    handleSave={handleSave}
                    disabled={isSaveDisabled}
                />
            </ContentContainer>
        </DialogCustom>
    );
}
