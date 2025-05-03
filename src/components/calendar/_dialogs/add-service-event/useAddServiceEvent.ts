import { DateTime } from 'luxon';
import { useState, useEffect, ChangeEvent } from 'react';
import { useCalendarContext } from 'calendar/_context/CalendarContext';
import { Appointment } from 'types/appointment';
import { ServiceViewModel } from 'types/serviceModel';
import { Staffer } from 'types/staffer';

export interface UseAddServiceEvent {
    notes: string;
    firstName: string;
    lastName: string;
    fromTime: DateTime;
    is24Hours: boolean;
    dateFormat: string;
    staffer: Staffer | undefined;
    selectedServices: ServiceViewModel[];
    isSaveDisabled: boolean;

    handleSave: () => void;
    handleFromTimeChange: (time: DateTime | null) => void;
    handleFromDateChange: (date: DateTime | null) => void;
    handleNotesChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleStafferChange: (stafferId: string) => void;
    handleChangeService: (services: ServiceViewModel[]) => void;
    resetForm: () => void;
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
    const [toTime, setToTime] = useState<DateTime>(DateTime.now());
    const [notes, setNotes] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const [staffer, setStaffer] = useState<Staffer | undefined>(undefined);
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
            setStaffer(
                assignedUser
                    ? {
                          id: assignedUser.id,
                          firstName: assignedUser.firstName,
                          lastName: assignedUser.lastName,
                          email: assignedUser.email,
                          phone: assignedUser.phone,
                      }
                    : undefined
            );

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
                staffer: appointmentAssign,
            } = dialogAppointment.appointment;

            setAppointmentId(id || '');
            setNotes(appointmentNotes || '');
            setFromTime(start ? DateTime.fromISO(start) : DateTime.now());
            setToTime(
                end
                    ? DateTime.fromISO(end)
                    : DateTime.now().plus({ minutes: 30 })
            );
            setStaffer(appointmentAssign);
        }
    }, [dialogAppointment, teamModel?.users]);

    const handleFromTimeChange = (newTime: DateTime | null): void => {
        if (newTime) {
            const newFrom = fromTime.set({
                hour: newTime.hour,
                minute: newTime.minute,
            });
            const diff = newFrom.diff(fromTime);
            setFromTime(newFrom);
            setToTime(toTime.plus(diff));
        }
    };

    const handleFromDateChange = (newDate: DateTime | null): void => {
        if (newDate) {
            const newFrom = fromTime.set({
                year: newDate.year,
                month: newDate.month,
                day: newDate.day,
            });
            const diff = newFrom.diff(fromTime);
            setFromTime(newFrom);
            setToTime(toTime.plus(diff));
        }
    };

    const handleChangeService = (selectedItems: ServiceViewModel[]): void => {
        setSelectedServices(selectedItems);
        const totalDuration = selectedItems.reduce(
            (sum, s) => sum + (s.duration || 0),
            0
        );
        setToTime(fromTime.plus({ minutes: totalDuration }));
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
        const staff = teamModel?.users.find((user) => user.id === id);
        setStaffer(staff);
    };

    const resetForm = (): void => {
        setFromTime(DateTime.now());
        setNotes('');
        setFirstName('');
        setLastName('');
        setAppointmentId('');
        setStaffer(undefined);
        setSelectedServices([]);
    };

    const handleSave = (): void => {
        const appointment: Appointment = {
            id: appointmentId,
            title: `${firstName} ${lastName}`,
            start: fromTime.toUTC().toISO() || '',
            end: toTime.toUTC().toISO() || '',
            notes,
            staffer,
            services: selectedServices,
            customer: {
                id: '',
                firstName,
                lastName,
            },
        };

        onSaveAppointment(appointment);
        onDialogAppointment(undefined);

        resetForm();
    };

    const isSaveDisabled =
        selectedServices.length === 0 ||
        firstName === '' ||
        lastName === '' ||
        staffer === undefined;

    return {
        notes,
        firstName,
        lastName,
        fromTime,
        is24Hours,
        dateFormat,
        staffer,
        selectedServices,
        isSaveDisabled,

        handleFirstNameChange,
        handleLastNameChange,
        handleSave,
        handleFromTimeChange,
        handleFromDateChange,
        handleNotesChange,
        handleStafferChange,
        handleChangeService,
        resetForm,
    };
};
