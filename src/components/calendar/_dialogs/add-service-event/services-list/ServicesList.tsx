import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import {
    formControlSx,
    renderTagBoxSx,
    menuItemSx,
    MenuProps,
    chipSx,
} from './styles';
import { RowItemWrapper } from 'calendar/_dialogs/new-event/styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import { CurrencyTypes, ServiceViewModel } from 'types/serviceModel';

interface Props {
    services: ServiceViewModel[];
    selectedServices: ServiceViewModel[];
    onChange: (services: ServiceViewModel[]) => void;
}

export default function ServicesList({
    services,
    selectedServices,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();

    const selectedIds = selectedServices.map((s) => s.id);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selected = event.target.value as string[];
        const selectedList = services.filter((s) => selected.includes(s.id));
        onChange(selectedList);
    };

    const currencySymbol = (currency: number): string => {
        switch (currency) {
            case CurrencyTypes.EUR:
                return '€';
            case CurrencyTypes.USD:
                return '$';
            case CurrencyTypes.GBP:
                return '£';
            default:
                return '';
        }
    };

    return (
        <RowItemWrapper>
            <InputTextLabel text={t('add.service', { ns: 'common' })} />
            <FormControl sx={formControlSx}>
                <Select
                    multiple
                    value={selectedIds}
                    onChange={handleChange}
                    size="small"
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                        <Box sx={renderTagBoxSx}>
                            {selected.map((id) => {
                                const service = services.find(
                                    (s) => s.id === id
                                );
                                return (
                                    <Chip
                                        key={id}
                                        label={service?.serviceName || id}
                                        sx={chipSx}
                                    />
                                );
                            })}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {services.map((service) => (
                        <MenuItem
                            key={service.id}
                            value={service.id}
                            sx={menuItemSx}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <span>{service.serviceName}</span>
                                <Box
                                    sx={{
                                        fontSize: 12,
                                        color: 'text.secondary',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {service.duration} min ·{' '}
                                    {currencySymbol(service.price.currency)}
                                    {service.price.amount}
                                </Box>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </RowItemWrapper>
    );
}
