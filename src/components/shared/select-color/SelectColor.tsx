import {
    FormControl,
    Select,
    MenuItem,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import React from 'react';

interface SelectColorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectColor({
    value,
    onChange,
}: SelectColorProps): React.ReactElement {
    const colorOptions = ['red', 'blue', 'green', 'orange', 'yellow', 'cyan'];

    const handleChange = (event: SelectChangeEvent<string>): void => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                sx={{
                    height: 40,
                    borderRadius: 1,
                    '& .MuiSelect-outlined': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
            >
                {colorOptions.map((color) => (
                    <MenuItem key={color} value={color}>
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: color,
                                borderRadius: '50%',
                                border: `1px solid ${color === value ? 'black' : 'transparent'}`,
                                margin: 'auto',
                            }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
