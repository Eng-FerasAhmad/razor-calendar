export const localizedLabels: Record<string, Record<string, string>> = {
    en: {
        day: 'Day',
        week: 'Week',
        month: 'Month',
        year: 'Year',
        agenda: 'Agenda',
        today: 'Today',
        next: 'Next',
        previous: 'Previous',
    },
    de: {
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
