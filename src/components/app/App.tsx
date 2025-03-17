import { Button, Drawer } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { config } from 'components/app/config';
import { initAppointments } from 'components/app/mockAppointment';
import { initialTeamModel } from 'components/app/mockTeam';
import { AppContainer } from 'components/app/styles';
import { RazorCalendarSidebar } from 'components/sidebar/CalendarSidebar';
import { Appointment, ViewType } from 'types/appointment';
import { TeamModel } from 'types/teamModel';

export default function App(): ReactElement {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    // Initialize appointments from local storage
    const [appointments, setAppointments] =
        useState<Appointment[]>(initAppointments);

    const [teamModel, setTeamModel] = useState<TeamModel>(initialTeamModel);

    // State for CalendarToolbar and Calendar
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

    const handleChangeDate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    const handleChangeTeamList = (userId: string, checked: boolean): void => {
        setTeamModel((prevTeamModel) => ({
            ...prevTeamModel,
            users: prevTeamModel.users.map((team) =>
                team.id === userId ? { ...team, visible: checked } : team
            ),
        }));
    };

    return (
        <AppContainer data-testid="app">
            <Button onClick={toggleDrawer(!open)}>drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <RazorCalendarSidebar
                    currentDate={currentDate}
                    onChangeDate={handleChangeDate}
                    config={config}
                    teamModel={teamModel}
                    onChangeTeamList={handleChangeTeamList}
                />
            </Drawer>

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
                teamModel={teamModel}
                hasCompactToolbar={true}
            />
        </AppContainer>
    );
}
