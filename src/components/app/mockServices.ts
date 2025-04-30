import { ServiceViewModel } from 'types/serviceModel';

export const dummyServices: ServiceViewModel[] = [
    {
        id: 'svc-1',
        serviceName: 'Haircut',
        description: 'Basic haircut for men',
        duration: 30,
        categoryId: 1,
        categoryName: 'Hair Services',
        price: {
            amount: 20,
            currency: 1,
        },
        shopId: 'shop-001',
    },
    {
        id: 'svc-2',
        serviceName: 'Hair Coloring',
        description: 'Permanent or semi-permanent hair color',
        duration: 90,
        categoryId: 1,
        categoryName: 'Hair Services',
        price: {
            amount: 50,
            currency: 1,
        },
        shopId: 'shop-001',
    },
    {
        id: 'svc-3',
        serviceName: 'Full Body Massage',
        description: '60-minute full body massage',
        duration: 60,
        categoryId: 2,
        categoryName: 'Spa Treatments',
        price: {
            amount: 70,
            currency: 1,
        },
        shopId: 'shop-001',
    },
    {
        id: 'svc-4',
        serviceName: 'Facial',
        description: 'Cleansing and rejuvenating facial treatment',
        duration: 45,
        categoryId: 2,
        categoryName: 'Spa Treatments',
        price: {
            amount: 40,
            currency: 1,
        },
        shopId: 'shop-001',
    },
];
