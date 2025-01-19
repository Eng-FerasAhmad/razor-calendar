import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
    darken,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface Option<T extends string | number> {
    value: T;
    label: string;
}

interface InputSelectProps<T extends string | number> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    label?: string;
    isCompact?: boolean;
    borderRadius?: number;
}

export default function InputSelect<T extends string | number>({
    options,
    value,
    onChange,
    label,
    isCompact,
    borderRadius,
}: InputSelectProps<T>): React.ReactElement {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<T>): void => {
        onChange(event.target.value as T);
    };

    return (
        <FormControl
            data-testid="form-control"
            fullWidth
            sx={{
                fontSize: '17px',
                '& .MuiOutlinedInput-root': {
                    overflow: 'none',
                    color: isCompact
                        ? theme.palette.text.primary
                        : theme.palette.primary.contrastText,
                    height: '34px',
                    padding: '4px 14px',
                    '& fieldset': {
                        borderWidth: '0px',
                        borderColor: isCompact
                            ? darken(theme.palette.border, 0.1)
                            : theme.palette.primary.dark,
                    },
                    '&:hover fieldset': {
                        borderColor: isCompact
                            ? darken(theme.palette.border, 0.1)
                            : theme.palette.primary.dark,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: isCompact
                            ? darken(theme.palette.border, 0.1)
                            : theme.palette.primary.dark,
                        borderWidth: '1px',
                    },
                    '& .MuiSelect-icon': {
                        color: isCompact
                            ? darken(theme.palette.border, 0.3)
                            : '#fff',
                    },
                },
            }}
        >
            {label && (
                <InputLabel
                    data-testid="input-label"
                    sx={{
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    {label}
                </InputLabel>
            )}
            <Select
                value={value}
                onChange={handleChange}
                data-testid="select"
                variant="outlined"
                size="small"
                label={label}
                sx={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    borderRadius: borderRadius || 1,
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '17px',
                    padding: '4px',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: darken(
                            theme.palette.action.hover,
                            0.1
                        ),
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        data-testid="menu-item"
                        key={String(option.value)}
                        value={option.value}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
