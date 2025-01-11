import { ViewType } from 'types/appointment';

export const localizedLabels: Record<string, Record<string, string>> = {
    en: {
        Team: 'Team',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year',
        agenda: 'Agenda',
        today: 'Today',
        nextMonth: 'Next',
        previousMonth: 'Previous',
    },
    de: {
        Team: 'Team',
        day: 'Tag',
        week: 'Woche',
        month: 'Monat',
        year: 'Jahr',
        agenda: 'Agenda',
        today: 'Heute',
        next: 'Weiter',
        previous: 'Zurück',
    },
};

export const getLocalizedLabel = (key: string, lang: string = 'en'): string => {
    return localizedLabels[lang]?.[key] || localizedLabels.en[key] || key;
};

export const options = (lang: string): { value: ViewType; label: string }[] => [
    { value: 'team', label: getLocalizedLabel('Team', lang) },
    { value: 'day', label: getLocalizedLabel('day', lang) },
    { value: 'week', label: getLocalizedLabel('week', lang) },
    { value: 'month', label: getLocalizedLabel('month', lang) },
    { value: 'year', label: getLocalizedLabel('year', lang) },
    { value: 'agenda', label: getLocalizedLabel('agenda', lang) },
];
