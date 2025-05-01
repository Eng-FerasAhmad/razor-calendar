import { DateTime } from 'luxon';
import { useState, useEffect, ChangeEvent } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { ServiceViewModel } from 'types/serviceModel';

export interface UseAddServiceEvent {
    notes: string;
    firstName: string;
    lastName: string;
    fromTime: DateTime;
    is24Hours: boolean;
    dateFormat: string;
    staffer: string;
    selectedServices: ServiceViewModel[];

    handleSave: () => void;
    handleFromTimeChange: (time: DateTime | null) => void;
    handleFromDateChange: (date: DateTime | null) => void;
    handleNotesChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleStafferChange: (stafferId: string) => void;
    handleChangeService: (services: ServiceViewModel[]) => void;
    isSaveDisabled: boolean;
}

export const useAddServiceEvent = (): UseAddServiceEvent => {
    const {
        config,
        dialogAppointment,
        teamModel,
        onSaveAppointment,
        onDialogAppointment,
    } = useCalendarContext();

    const is24Hours = config.hour?.is24HourFormat || false;
    const dateFormat =
        config.common?.dateFormat ||
        (config.common.locale === 'de' ? 'dd.MM.yyyy' : 'dd/MM/yyyy');

    const [fromTime, setFromTime] = useState<DateTime>(DateTime.now());
    const [toTime, setToTime] = useState<DateTime>(
        DateTime.now().plus({ minutes: 30 })
    );
    const [notes, setNotes] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const [staffer, setStaffer] = useState<string>('');
    const [selectedServices, setSelectedServices] = useState<
        ServiceViewModel[]
    >([]);

    useEffect(() => {
        if (dialogAppointment?.slotId) {
            const [datePart, timePart, userId] =
                dialogAppointment.slotId.split('$') || [];
            const [year, month, day] = datePart?.split('-').map(Number) || [];
            const [hour, minute] = timePart?.split(':').map(Number) || [0, 0];

            const assignedUser = teamModel?.users.find(
                (user) => user.id === userId
            );
            setStaffer(assignedUser ? assignedUser.id : '');

            if (year && month && day && timePart) {
                const newFromTime = DateTime.fromObject({
                    year,
                    month,
                    day,
                    hour,
                    minute,
                });
                setFromTime(newFromTime);
                setToTime(newFromTime.plus({ minutes: 30 }));
            }
        } else if (dialogAppointment?.appointment) {
            const {
                id,
                notes: appointmentNotes,
                start,
                end,
                stafferId: appointmentAssign,
            } = dialogAppointment.appointment;

            setAppointmentId(id || '');
            setNotes(appointmentNotes || '');
            setFromTime(start ? DateTime.fromISO(start) : DateTime.now());
            setToTime(
                end
                    ? DateTime.fromISO(end)
                    : DateTime.now().plus({ minutes: 30 })
            );
            setStaffer(appointmentAssign || '');
        }
    }, [dialogAppointment, teamModel?.users]);

    const handleFromTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            setFromTime(
                fromTime.set({ hour: newTime.hour, minute: newTime.minute })
            );
        }
    };

    const handleFromDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            setFromTime(
                fromTime.set({
                    year: newDate.year,
                    month: newDate.month,
                    day: newDate.day,
                })
            );
        }
    };

    const handleNotesChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setNotes(event.target.value);
    };

    const handleFirstNameChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setLastName(event.target.value);
    };

    const handleStafferChange = (id: string): void => {
        setStaffer(id);
    };

    const handleChangeService = (selectedItems: ServiceViewModel[]): void => {
        setSelectedServices(selectedItems);
    };

    const handleSave = (): void => {
        const appointment: Appointment = {
            id: appointmentId,
            start: fromTime.toISO()!,
            end: toTime.toISO()!,
            notes,
            stafferId: staffer,
            services: selectedServices,
            customer: {
                id: '',
                firstName,
                lastName,
            },
        };

        onSaveAppointment(appointment);
        onDialogAppointment(undefined);

        setFromTime(DateTime.now());
        setNotes('');
        setAppointmentId('');
        setStaffer('');
        setSelectedServices([]);
    };

    const isSaveDisabled = false; // add your logic here to check the service and time not empty

    return {
        notes,
        firstName,
        lastName,
        fromTime,
        is24Hours,
        dateFormat,
        staffer,
        selectedServices,

        handleFirstNameChange,
        handleLastNameChange,

        handleSave,
        handleFromTimeChange,
        handleFromDateChange,
        handleNotesChange,
        handleStafferChange,
        handleChangeService,
        isSaveDisabled,
    };
};
