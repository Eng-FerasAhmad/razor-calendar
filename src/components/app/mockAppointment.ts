import { Appointment } from 'types/appointment';

export const initAppointments: Appointment[] = [
    {
        id: '1',
        title: 'Meeting at these times are very important',
        start: '2025-02-23T13:00',
        end: '2025-02-23T13:10',
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
        reminder: { amount: 30, unit: 'minutes' },
    },
    {
        id: '2',
        title: 'Lunch but also long long text',
        start: '2025-02-22T09:00',
        end: '2025-02-22T09:05',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 3, unit: 'hours' },
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
        start: '2025-02-21T13:00',
        end: '2025-02-21T14:00',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 1, unit: 'days' },
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
        start: '2025-02-21T13:00',
        end: '2025-02-21T15:00',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 2, unit: 'weeks' },
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
        start: '2025-01-22T14:30',
        end: '2025-01-21T15:30',
        isFullDay: true,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        start: '2025-02-20T10:00',
        end: '2025-02-20T11:00',
        isFullDay: false,
        color: '#33b679',
        canceled: false,
        draggable: true,
        editable: true,
        available: false,
        visibility: true,
        location: 'id',
        reminder: { amount: 30, unit: 'minutes' },
        assign: [
            {
                id: 'anna-id',
                firstName: 'Anna',
                lastName: 'Marie',
                image: '',
                color: '#880b73',
                visible: false,
            },
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
        id: '7',
        title: 'View 3',
        start: '2025-02-20T13:00',
        end: '2025-02-22T14:00',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        start: '2025-02-20T12:00',
        end: '2025-02-20T13:00',
        isFullDay: true,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        id: '9',
        title: 'View 5',
        start: '2025-02-19T13:00',
        end: '2025-02-19T13:30',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        start: '2025-02-19T11:00',
        end: '2025-02-19T13:00',
        isFullDay: true,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        start: '2025-02-17T13:00',
        end: '2025-02-17T14:30',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
        start: '2025-02-18T13:00',
        end: '2025-02-18T14:00',
        isFullDay: false,
        color: '#33b679',
        reminder: { amount: 30, unit: 'minutes' },
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
