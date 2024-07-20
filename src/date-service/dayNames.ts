export const dayNames = (local: string): Array<string> => {
    switch (local) {
        case 'en':
            return [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ];
        case 'de':
            return [
                'Montag',
                'Dienstag',
                'Mittwoch',
                'Donnerstag',
                'Freitag',
                'Samstag',
                'Sonntag',
            ];
        default:
            return [''];
    }
};
