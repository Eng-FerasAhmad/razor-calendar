import IconButton from '@mui/material/IconButton';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { CloseOutline } from 'razor-icon-library';
import React, { ReactElement, useState } from 'react';

interface Props {
    clearHandler: () => void;
}

export function SearchStaffers({
    clearHandler,
    ...props
}: Props & InputBaseProps): ReactElement {
    const theme = useTheme();
    const [value, setValue] = useState(props.value || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleClear = (): void => {
        setValue('');
        clearHandler();
    };

    const clickSubmitHandler = (
        e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
    ): void => {
        e.preventDefault();
    };

    return (
        <Paper
            variant="outlined"
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: 37,
                mb: 2,
                borderRadius: '20px',
                pl: 1,
                pr: 1,
            }}
            onSubmit={clickSubmitHandler}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                }}
                {...props}
                value={value}
                onChange={handleChange}
                inputProps={{
                    'aria-label': 'search',
                    placeholder: props.placeholder || 'Search...', // Ensuring placeholder is passed
                }}
            />
            {value && (
                <IconButton
                    type="button"
                    sx={{ p: '5px' }}
                    aria-label="clear"
                    onClick={handleClear}
                >
                    <CloseOutline size={20} color={theme.palette.grey['500']} />
                </IconButton>
            )}
        </Paper>
    );
}
