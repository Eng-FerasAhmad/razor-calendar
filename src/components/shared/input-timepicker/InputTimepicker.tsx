import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';

interface TimePickerGenericProps
    extends Omit<TimePickerProps<DateTime>, 'renderInput'> {
    label: string;
    is24Hours?: boolean;
}

export default function InputTimepicker({
    label,
    value,
    onChange,
    is24Hours = true,
    ...props
}: TimePickerGenericProps): ReactElement {
    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <TimePicker
                {...props}
                value={value}
                onChange={onChange}
                ampm={!is24Hours}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        size: 'small',
                        label,
                    },
                }}
            />
        </LocalizationProvider>
    );
}
