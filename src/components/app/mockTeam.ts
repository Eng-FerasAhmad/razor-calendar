import { TeamModel } from 'types/teamModel';

export const initialTeamModel: TeamModel = {
    users: [
        {
            id: 'max-id',
            firstName: 'Max Hemlmut',
            lastName: 'Musterman Bluster',
            image: 'https://picsum.photos/200/300?grayscale',
            color: '#6b5b95',
            visible: true,
            notAvailable: true,
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
