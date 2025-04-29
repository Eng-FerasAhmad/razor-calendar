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
    weekStartsOn?: 'sunday' | 'monday';
}

const getLocale = (weekStartsOn?: 'sunday' | 'monday'): 'en-GB' | 'en-US' => {
    switch (weekStartsOn) {
        case 'monday':
            return 'en-GB'; // or 'de', 'fr'
        case 'sunday':
        default:
            return 'en-US';
    }
};

export default function DatePickerInput({
    label,
    value,
    onChange,
    dateFormat = 'yyyy-MM-dd',
    error = false,
    helperText,
    weekStartsOn = 'monday',
    ...props
}: Props): ReactElement {
    return (
        <LocalizationProvider
            dateAdapter={AdapterLuxon}
            adapterLocale={getLocale(weekStartsOn)}
        >
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
                                borderRadius: '8px',
                                '& .MuiSvgIcon-root': {
                                    fontSize: '20px',
                                    color: '#6B7280',
                                },
                            },
                        },
                        FormHelperTextProps: {
                            sx: { minHeight: '10px' },
                        },
                    },
                    popper: {
                        sx: {
                            '& .MuiPaper-root': {
                                borderRadius: '12px',
                                padding: '0',
                                fontSize: '14px',
                                color: '#1F2937', // text-gray-800
                            },
                            '& .MuiPickersCalendarHeader-label': {
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#374151', // text-gray-700
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '13px',
                            },
                            '& .MuiPickersDay-root': {
                                fontSize: '14px',
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
}
