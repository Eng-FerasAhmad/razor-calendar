import { TimePicker, TimePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';

interface InputTimepickerProps
    extends Omit<TimePickerProps<DateTime>, 'renderInput'> {
    label?: string;
    is24Hours?: boolean;
    error?: boolean;
    helperText?: string;
}

export default function InputTimepicker({
    label,
    value,
    onChange,
    error = false,
    helperText = '',
    is24Hours = true,
    ...props
}: InputTimepickerProps): ReactElement {
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
                        error,
                        helperText,
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                fontSize: '15px',
                                borderRadius: '8px',
                                '& input': {
                                    padding: '11px 10px',
                                    fontSize: '15px',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: '20px',
                                    color: '#6B7280',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '15px',
                            },
                        },
                        FormHelperTextProps: {
                            sx: {
                                minHeight: '10px',
                                fontSize: '11px',
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
