import { Button, Drawer } from '@mui/material';
import { DateTime } from 'luxon';
import { ReactElement, useState } from 'react';

import { RazorCalendar } from 'calendar/index';
import { AppContainer } from 'components/app/styles';
import { RazorCalendarSidebar } from 'components/sidebar/CalendarSidebar';
import { RazorToolbarCompact } from 'components/toolbar/compact-toolbar';
import { Appointment, ViewType } from 'types/appointment';
import { CalendarConfig, RazorCalendarConfig } from 'types/calendarConfig';
import { TeamModel } from 'types/teamModel';

export default function App(): ReactElement {
    // const locale = 'en-GB';
    const locale = 'de-DE';

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const appointments: Appointment[] = [
        {
            id: '1',
            title: 'Meeting at these times are very important',
            start: '2025-01-27T13:00',
            end: '2025-01-27T13:10',
            isFullDay: false,
            color: '#33b679',
            assign: [
                {
                    id: 'max-id',
                    firstName: 'Max Hemlmut',
                    lastName: 'Musterman Bluster',
                    image: 'https://picsum.photos/200/300?grayscale',
                    color: '#6b5b95',
                    visible: true,
                },
            ],
            reminder: 30,
        },
        {
            id: '2',
            title: 'Lunch but also long long text',
            start: '2025-01-27T09:00',
            end: '2025-01-27T09:05',
            isFullDay: false,
            color: '#33b679',
            reminder: 300,
            assign: [
                {
                    id: 'martin-id',
                    firstName: 'Martin',
                    lastName: 'Klaus',
                    image: '',
                    color: '#ff7b25',
                    visible: true,
                },
                {
                    id: 'jef-id',
                    firstName: 'Jef',
                    lastName: 'Santos',
                    image: '',
                    color: '#329b9b',
                    visible: false,
                },
            ],
        },
        {
            id: '3',
            title: 'Meeting',
            start: '2025-01-27T13:00',
            end: '2025-01-27T14:00',
            isFullDay: false,
            color: '#33b679',
            reminder: 3000,
            assign: [
                {
                    id: 'id',
                    firstName: '',
                    lastName: '',
                    image: '',
                    color: '#919092',
                    visible: true,
                },
            ],
        },
        {
            id: '4',
            title: 'Lunch: how about more longer text like this one hier, what you say',
            start: '2025-01-27T13:00',
            end: '2025-01-27T15:00',
            isFullDay: false,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'max-id',
                    firstName: 'Max Hemlmut',
                    lastName: 'Musterman Bluster',
                    image: 'https://picsum.photos/200/300?grayscale',
                    color: '#6b5b95',
                    visible: true,
                },
            ],
        },
        {
            id: '5',
            title: 'View 1',
            start: '2025-01-28T14:30',
            end: '2025-01-28T15:30',
            isFullDay: true,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'max-id',
                    firstName: 'Max Hemlmut',
                    lastName: 'Musterman Bluster',
                    image: 'https://picsum.photos/200/300?grayscale',
                    color: '#6b5b95',
                    visible: true,
                },
            ],
        },
        {
            id: '6',
            title: 'View 2',
            start: '2025-01-28T10:00',
            end: '2025-01-28T12:10',
            isFullDay: false,
            color: '#33b679',
            canceled: false,
            draggable: true,
            editable: true,
            available: false,
            visibility: true,
            location: 'id',
            reminder: 30,
            assign: [
                {
                    id: 'anna-id',
                    firstName: 'Anna',
                    lastName: 'Marie',
                    image: '',
                    color: '#880b73',
                    visible: false,
                },
            ],
        },
        {
            id: '7',
            title: 'View 3',
            start: '2025-01-29T13:00',
            end: '2025-01-29T14:00',
            isFullDay: false,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'id',
                    firstName: '',
                    lastName: '',
                    image: '',
                    color: '#919092',
                    visible: true,
                },
            ],
        },
        {
            id: '8',
            title: 'View 4',
            start: '2025-02-01T12:00',
            end: '2025-02-01T13:00',
            isFullDay: true,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'anna-id',
                    firstName: 'Anna',
                    lastName: 'Marie',
                    image: '',
                    color: '#880b73',
                    visible: false,
                },
            ],
        },
        {
            id: '9',
            title: 'View 5',
            start: '2025-01-29T13:00',
            end: '2025-01-29T13:30',
            isFullDay: false,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'ferdi-id',
                    firstName: 'Ferdi',
                    lastName: 'Mateo',
                    image: '',
                    color: '#bd6638',
                    visible: false,
                },
            ],
        },
        {
            id: '10',
            title: 'View 5 aber also long long text aber also long long text ',
            start: '2025-01-29T11:00',
            end: '2025-01-29T13:00',
            isFullDay: true,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'anna-id',
                    firstName: 'Anna',
                    lastName: 'Marie',
                    image: '',
                    color: '#880b73',
                    visible: false,
                },
            ],
        },
        {
            id: '11',
            title: 'View 2 days',
            start: '2025-01-30T13:00',
            end: '2025-01-30T14:30',
            isFullDay: false,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'jef-id',
                    firstName: 'Jef',
                    lastName: 'Santos',
                    image: '',
                    color: '#329b9b',
                    visible: false,
                },
            ],
        },
        {
            id: '12',
            title: 'View full day with long long text',
            start: '2025-01-30T13:00',
            end: '2025-01-30T14:00',
            isFullDay: false,
            color: '#33b679',
            reminder: 30,
            assign: [
                {
                    id: 'muster-id',
                    firstName: 'Muster Kurt',
                    lastName: 'Lux',
                    image: 'https://picsum.photos/seed/picsum/200/300',
                    color: '#cb8587',
                    visible: false,
                },
            ],
        },
    ];

    const config: RazorCalendarConfig<CalendarConfig> = {
        hour: {
            is24HourFormat: true,
            hourIntervalIndex: 1,
            workHoursStart: 8,
            workHoursEnd: 18,
        },
        month: {
            showWeekNumbers: true,
        },
        week: {
            showWeekend: true,
            showWeekNumbers: true,
        },
        common: {
            locale,
            dateFormat: 'dd.MM.yyyy',
        },
        style: {
            primaryColor: '#33b679',
            topStartFrom: 74,
        },
    };

    const initialTeam: TeamModel = {
        users: [
            {
                id: 'max-id',
                firstName: 'Max Hemlmut',
                lastName: 'Musterman Bluster',
                image: 'https://picsum.photos/200/300?grayscale',
                color: '#6b5b95',
                visible: true,
            },
            {
                id: 'martin-id',
                firstName: 'Martin',
                lastName: 'Klaus',
                image: '',
                color: '#ff7b25',
                visible: true,
            },
            {
                id: 'muster-id',
                firstName: 'Muster Kurt',
                lastName: 'Lux',
                image: 'https://picsum.photos/seed/picsum/200/300',
                color: '#3e4444',
                visible: false,
            },
            {
                id: 'jef-id',
                firstName: 'Jef',
                lastName: 'Santos',
                image: '',
                color: '#329b9b',
                visible: false,
            },
            {
                id: 'ermir-id',
                firstName: 'Ermir',
                lastName: 'Beto',
                image: '',
                color: '#99990c',
                visible: true,
            },
            {
                id: 'eline-id',
                firstName: 'Eline',
                lastName: 'Li',
                image: '',
                color: '#7f1db1',
                visible: true,
            },
            {
                id: 'karina-id',
                firstName: 'Karina',
                lastName: 'Melo',
                image: '',
                color: '#d25757',
                visible: false,
            },
            {
                id: 'james-id',
                firstName: 'James',
                lastName: 'Macaroni',
                image: '',
                color: '#13475d',
                visible: false,
            },
            {
                id: 'ferdi-id',
                firstName: 'Ferdi',
                lastName: 'Mateo',
                image: '',
                color: '#bd6638',
                visible: false,
            },
            {
                id: 'anna-id',
                firstName: 'Anna',
                lastName: 'Marie',
                image: '',
                color: '#880b73',
                visible: false,
            },
        ],
        showLastName: false,
    };

    const [teamModel, setTeamModel] = useState<TeamModel>(initialTeam);

    // State for CalendarToolbar and Calendar
    const [currentView, setCurrentView] = useState<ViewType>('team');
    const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now);

    // Handlers
    const handleViewChange = (view: ViewType): void => {
        setCurrentView(view);
    };

    const handleNavigate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    const onChangeDate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    const handleChangeAppointment = (appointment: Appointment): void => {
        console.log('Save to parent: Changed Appointment:', appointment);
    };

    const handleSaveAppointment = (appointment: Appointment): void => {
        console.log('Save to parent Appointment:', appointment);
    };

    const handleDeleteAppointment = (appointment: Appointment): void => {
        console.log('Delete to parent Appointment:', appointment);
    };

    const handleChangeDate = (newDate: DateTime): void => {
        setCurrentDate(newDate);
    };

    const handleChangeTeamList = (userId: string, checked: boolean): void => {
        const updatedTeams = teamModel.users.map((team) =>
            team.id === userId ? { ...team, visible: checked } : team
        );

        setTeamModel({
            ...teamModel,
            users: updatedTeams,
        });
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

            <RazorToolbarCompact
                currentView={currentView}
                onViewChange={handleViewChange}
                currentDate={currentDate}
                onNavigate={handleNavigate}
                config={config}
            />

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
            />
        </AppContainer>
    );
}
