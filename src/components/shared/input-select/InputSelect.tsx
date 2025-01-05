import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
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
}

export default function InputSelect<T extends string | number>({
    options,
    value,
    onChange,
    label,
}: InputSelectProps<T>): React.ReactElement {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<T>): void => {
        onChange(event.target.value as T);
    };

    return (
        <FormControl
            fullWidth
            sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                    color: theme.palette.primary.contrastText,
                    height: '38px',
                    '& fieldset': {
                        borderColor: theme.palette.primary.dark,
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.primary.dark,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.dark,
                    },
                },
            }}
        >
            {label && (
                <InputLabel
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
                variant="outlined"
                size="small"
                label={label}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderRadius: 1,
                    height: '38px', // Custom height for the Select component
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {options.map((option) => (
                    <MenuItem
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
