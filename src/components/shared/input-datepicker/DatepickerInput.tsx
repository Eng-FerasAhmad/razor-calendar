import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTime } from 'luxon';
import { ReactElement } from 'react';
import { textFieldStyles, popperStyles, formHelperTextStyles } from './styles';

interface Props extends Omit<DatePickerProps<DateTime>, 'renderInput'> {
    label?: string;
    dateFormat?: string;
    error?: boolean;
    helperText?: string;
    weekStartsOn?: 'sunday' | 'monday';
    hideTextField?: boolean;
    anchorEl?: HTMLElement | null;
    sx?: object;
}

const getLocale = (weekStartsOn?: 'sunday' | 'monday'): 'en-GB' | 'en-US' => {
    switch (weekStartsOn) {
        case 'monday':
            return 'en-GB';
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
    hideTextField = false,
    anchorEl,
    sx = {},
    ...props
}: Props): ReactElement {
    const isCustomAnchor = hideTextField && anchorEl;

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
                    textField: hideTextField
                        ? { style: { display: 'none' } }
                        : {
                              fullWidth: true,
                              size: 'small',
                              label,
                              error,
                              helperText,
                              sx: { ...textFieldStyles, ...sx },
                              FormHelperTextProps: {
                                  sx: formHelperTextStyles,
                              },
                          },
                    popper: {
                        sx: (theme) => popperStyles(theme),
                        disablePortal: false,
                        ...(isCustomAnchor && { anchorEl }),
                        modifiers: [
                            {
                                name: 'preventOverflow',
                                options: {
                                    boundary: 'viewport',
                                },
                            },
                        ],
                    },
                }}
            />
        </LocalizationProvider>
    );
}
