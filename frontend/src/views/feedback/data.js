import { v4 as uuid } from 'uuid';

export default [
    {
        id: uuid(),
        address: {
            country: 'USA',
            state: 'West Virginia',
            city: 'Parkersburg',
            street: '2849 Fulton Street'
        },
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Ekaterina Tankova',
        interviewDate: '1555016400000',
        role: 'Software Engineer',
        team: 'Eco-System Engineering'
    },
    {
        id: uuid(),
        address: {
            country: 'USA',
            state: 'Bristow',
            city: 'Iowa',
            street: '1865  Pleasant Hill Road'
        },
        avatarUrl: '/static/images/avatars/avatar_4.png',
        createdAt: 1555016400000,
        email: 'cao.yu@devias.io',
        name: 'Cao Yu',
        interviewDate: '23-12-2020',
        schedualedTime: '10.00AM',
        role: 'Software Engineer',
        team: 'Eco-System Engineering'
    },
];
