import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';

interface DatePickerGenericProps
    extends Omit<DatePickerProps<DateTime>, 'renderInput'> {
    label: string;
    dateFormat?: string;
}

export default function DatePickerGeneric({
    label,
    value,
    onChange,
    dateFormat = 'yyyy-MM-dd',
    ...props
}: DatePickerGenericProps): ReactElement {
    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker
                {...props}
                value={value}
                onChange={onChange}
                format={dateFormat}
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
