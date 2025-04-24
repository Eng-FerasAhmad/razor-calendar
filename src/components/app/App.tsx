import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { config } from 'components/app/config';
import { initAppointments } from 'components/app/mockAppointment';
import { initialTeamModel } from 'components/app/mockTeam';
import { AppContainer, CalendarContentContainer } from 'components/app/styles';
import { Appointment, ViewType } from 'types/appointment';

export default function App(): ReactElement {
    // Initialize appointments from local storage
    const [appointments, setAppointments] =
        useState<Appointment[]>(initAppointments);

    // State for HeaderTemplate and Calendar
    const [currentView, setCurrentView] = useState<ViewType>('team');
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now);

    // Handlers
    const handleViewChange = (view: ViewType): void => {
        setCurrentView(view);
    };

    /* const handleNavigate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    }; */

    const onChangeDate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    // Update an existing appointment
    const handleChangeAppointment = (
        updatedAppointment: Appointment[]
    ): void => {
        setAppointments(updatedAppointment);
    };

    // Add a new appointment
    const handleSaveAppointment = (newAppointment: Appointment): void => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) => {
                return appointment.id === newAppointment.id
                    ? newAppointment
                    : appointment;
            })
        );
        console.log('Appointment Updated:', newAppointment);
    };

    // Delete an appointment
    const handleDeleteAppointment = (
        appointmentToDelete: Appointment
    ): void => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter(
                (appointment) => appointment.id !== appointmentToDelete.id
            )
        );
        console.log('Appointment Deleted:', appointmentToDelete);
    };

    return (
        <AppContainer data-testid="app">
            <CalendarContentContainer>
                <RazorCalendar
                    appointments={appointments}
                    handleChangeAppointment={handleChangeAppointment}
                    handleSaveAppointment={handleSaveAppointment}
                    handleDeleteAppointment={handleDeleteAppointment}
                    view={currentView}
                    onViewChange={handleViewChange}
                    selectedDate={currentDate}
                    onChangeDate={onChangeDate}
                    config={config}
                    teamModel={initialTeamModel}
                />
            </CalendarContentContainer>
        </AppContainer>
    );
}
