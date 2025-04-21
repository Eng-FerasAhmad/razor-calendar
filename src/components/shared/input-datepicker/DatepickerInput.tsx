import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';

interface Props extends Omit<DatePickerProps<DateTime>, 'renderInput'> {
    label?: string;
    dateFormat?: string;
    error?: boolean;
    helperText?: string;
}

export default function DatePickerInput({
    label,
    value,
    onChange,
    dateFormat = 'yyyy-MM-dd',
    error = false,
    helperText,
    ...props
}: Props): ReactElement {
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
                            '& .MuiPickersCalendarHeader-root': {
                                marginTop: '5px',
                                marginBottom: '5px',
                                padding: '0 10px',
                            },
                        },
                        FormHelperTextProps: {
                            sx: {
                                minHeight: '10px',
                                fontSize: '15px',
                                '& .MuiPickersCalendarHeader-root': {
                                    marginTop: '5px',
                                    marginBottom: '5px',
                                    padding: '0 10px',
                                },
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
