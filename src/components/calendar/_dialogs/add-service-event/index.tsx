import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import ActionButtons from './ActionButtons';
import NotesInput from './NotesInput';
import StartDate from './StartDate';
import { ContentContainer } from './styles';
import { useAddServiceEvent } from './useAddServiceEvent';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import NameInput from 'calendar/_dialogs/add-service-event/NameInput';
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
        customer,
        selectedServices,
        isSaveDisabled,
        handleSave,
        handleFromTimeChange,
        handleFromDateChange,
        handleNotesChange,
        handleFirstNameChange,
        handleLastNameChange,
        handleStafferChange,
        handleChangeService,
        resetForm,
    } = useAddServiceEvent();

    const { t } = useTranslation();
    const { dialogAppointment, onDialogAppointment, teamModel, services } =
        useCalendarContext();

    const handleCloseDialog = (): void => {
        onDialogAppointment(undefined);
        resetForm();
    };

    return (
        <DialogCustom
            title={t('add.header', { ns: 'common' })}
            description={t('add.description', { ns: 'common' })}
            open={dialogAppointment?.open || false}
            handleClose={handleCloseDialog}
        >
            <ContentContainer data-testid="new-appointment-content">
                <NameInput
                    customer={customer}
                    onChangeFirstName={handleFirstNameChange}
                    onChangeLastName={handleLastNameChange}
                />

                <ServicesList
                    services={services}
                    selectedServices={selectedServices}
                    onChange={handleChangeService}
                />

                <StartDate
                    fromTime={fromTime}
                    isFullDay={false}
                    dateFormat={dateFormat}
                    is24Hours={is24Hours}
                    handleFromDateChange={handleFromDateChange}
                    handleFromTimeChange={handleFromTimeChange}
                />

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
