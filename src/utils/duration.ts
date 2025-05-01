export const formatDuration = (
    minutes: number,
    t: (key: string) => string,
    locale: string
): string => {
    if (minutes >= 60) {
        const hours = minutes / 60;
        return locale === 'de'
            ? `${hours.toFixed(1).replace('.', ',')} ${t('unit.hour')}`
            : `${hours.toFixed(1)}${t('unit.hour')}`;
    }
    return `${minutes} min`;
};
