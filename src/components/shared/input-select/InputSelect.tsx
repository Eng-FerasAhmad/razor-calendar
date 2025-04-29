import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
    formControlStyles,
    inputLabelStyles,
    selectStyles,
    menuItemStyles,
} from './styles';

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
            data-testid="form-control"
            fullWidth
            sx={formControlStyles(theme)}
        >
            {label && (
                <InputLabel data-testid="input-label" sx={inputLabelStyles()}>
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
                sx={selectStyles(theme)}
                MenuProps={{
                    MenuListProps: {
                        sx: {
                            paddingTop: 0,
                            paddingBottom: 0,
                        },
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        data-testid="menu-item"
                        key={String(option.value)}
                        value={option.value}
                        sx={menuItemStyles(theme)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
