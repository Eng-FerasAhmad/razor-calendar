import Box from '@mui/material/Box';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceViewModel } from 'types/serviceModel';
import { currencySymbol } from 'utils/currency';

interface Props {
    selectedServices: ServiceViewModel[];
}

const duration = (
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

export default function TotalCostDuration({
    selectedServices,
}: Props): ReactElement {
    const { t, i18n } = useTranslation();

    if (selectedServices.length === 0) return <></>;

    const totalMinutes = selectedServices.reduce(
        (sum, s) => sum + s.duration,
        0
    );
    const totalCost = selectedServices
        .reduce((sum, s) => sum + s.price.amount, 0)
        .toFixed(2);
    const currency = currencySymbol(selectedServices[0].price.currency);

    return (
        <Box sx={{ fontSize: 12, color: 'text.secondary' }}>
            {duration(totalMinutes, t, i18n.language)} · {totalCost}
            {currency}
        </Box>
    );
}
