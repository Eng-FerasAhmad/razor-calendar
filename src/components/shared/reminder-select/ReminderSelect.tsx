import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import React, { useState, useEffect, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ReminderValue } from 'components/shared/reminder-select/types';

interface Props {
    value: ReminderValue;
    onChange: (newValue: ReminderValue) => void;
}

export default function ReminderSelect({
    value,
    onChange,
}: Props): ReactElement {
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number>(value.amount);
    const [unit, setUnit] = useState<ReminderValue['unit']>(value.unit);

    useEffect(() => {
        setAmount(value.amount);
        setUnit(value.unit);
    }, [value]);

    const handleAmountChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const newAmount = Number(event.target.value);
        setAmount(newAmount);
        onChange({ amount: newAmount, unit });
    };

    const handleUnitChange = (event: SelectChangeEvent<string>): void => {
        const newUnit = event.target.value as ReminderValue['unit'];
        setUnit(newUnit);
        onChange({ amount, unit: newUnit });
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            <TextField
                type="number"
                label={t('reminder.amount', { ns: 'common' })}
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
                sx={{ width: '135px' }}
                size="small"
            />
            <FormControl
                variant="outlined"
                size="small"
                sx={{ width: '150px' }}
            >
                <Select value={unit} onChange={handleUnitChange}>
                    <MenuItem value="minutes">
                        {t('reminder.minutes', { ns: 'common' })}
                    </MenuItem>
                    <MenuItem value="hours">
                        {t('reminder.hours', { ns: 'common' })}
                    </MenuItem>
                    <MenuItem value="days">
                        {t('reminder.days', { ns: 'common' })}
                    </MenuItem>
                    <MenuItem value="weeks">
                        {t('reminder.weeks', { ns: 'common' })}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
