import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ActionButtons from './ActionButtons';
import NotesInput from './NotesInput';
import StartDate from './StartDate';
import { ContentContainer, RowReminderWrapper } from './styles';
import { useAddServiceEvent } from './useAddServiceEvent';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import ServicesList from 'calendar/_dialogs/add-service-event/services-list/ServicesList';
import StafferList from 'calendar/_dialogs/add-service-event/StafferList';
import { DialogCustom } from 'components/shared/dialog/Dialog';

export default function AddServiceEventIndex(): ReactElement {
    const {
        notes,
        fromTime,
        is24Hours,
        dateFormat,
        staffer,
        selectedServices,
        isSaveDisabled,
        handleSave,
        handleFromTimeChange,
        handleFromDateChange,
        handleNotesChange,
        handleStafferChange,
        setFromTime,
        handleChangeService,
    } = useAddServiceEvent();

    const { t } = useTranslation();
    const { dialogAppointment, onDialogAppointment, teamModel, services } =
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
                <ServicesList
                    services={services}
                    selectedServices={selectedServices}
                    onChange={handleChangeService}
                />

                <RowReminderWrapper>
                    <StartDate
                        fromTime={fromTime}
                        isFullDay={false}
                        dateFormat={dateFormat}
                        is24Hours={is24Hours}
                        setFromTime={setFromTime}
                        handleFromDateChange={handleFromDateChange}
                        handleFromTimeChange={handleFromTimeChange}
                    />
                </RowReminderWrapper>

                <StafferList
                    stafferList={teamModel?.users}
                    staffer={staffer}
                    onChange={handleStafferChange}
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
