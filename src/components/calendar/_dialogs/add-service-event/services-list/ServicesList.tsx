import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import {
    formControlSx,
    menuItemSx,
    MenuProps,
    renderHeaderBoxSx,
    renderItemsBoxSx,
    renderMenuItemBoxSx,
} from './styles';
import ServiceSelectedChips from 'calendar/_dialogs/add-service-event/services-list/ServiceSelectedChips';
import TotalCostDuration from 'calendar/_dialogs/add-service-event/services-list/TotalCostDuration';
import { RowItemWrapper } from 'calendar/_dialogs/new-event/styles';
import InputTextLabel from 'components/shared/input-label/InputTextLabel';
import { ServiceViewModel } from 'types/serviceModel';
import { currencySymbol } from 'utils/currency';
import { formatDuration } from 'utils/duration';

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
    const { t, i18n } = useTranslation();
    const selectedIds = selectedServices.map((s) => s.id);

    const handleChange = (event: SelectChangeEvent<string[]>): void => {
        const selected = event.target.value as string[];
        const selectedList = services.filter((s) => selected.includes(s.id));
        onChange(selectedList);
    };

    return (
        <RowItemWrapper>
            <Box sx={renderHeaderBoxSx}>
                <InputTextLabel text={t('add.service', { ns: 'common' })} />
                <TotalCostDuration selectedServices={selectedServices} />
            </Box>
            <FormControl sx={formControlSx}>
                <Select
                    multiple
                    value={selectedIds}
                    onChange={handleChange}
                    size="small"
                    input={<OutlinedInput />}
                    renderValue={(selected) => (
                        <ServiceSelectedChips
                            selected={selected}
                            services={services}
                        />
                    )}
                    MenuProps={MenuProps}
                    data-testid="services-list-select"
                >
                    {services.map((service) => (
                        <MenuItem
                            key={service.id}
                            value={service.id}
                            sx={menuItemSx}
                        >
                            <Box sx={renderItemsBoxSx}>
                                <span>{service.serviceName}</span>
                                <Box sx={renderMenuItemBoxSx}>
                                    {`${formatDuration(
                                        service.duration,
                                        t,
                                        i18n.language
                                    )} . `}
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
