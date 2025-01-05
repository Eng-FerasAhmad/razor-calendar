import { Button as MUIButton, useTheme, darken } from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';

interface Props {
    onClick: () => void;
}

export default function Button({
    children,
    onClick,
}: PropsWithChildren<Props>): ReactElement {
    const theme = useTheme(); // Access the theme for primary color

    return (
        <MUIButton
            variant="outlined"
            onClick={onClick}
            sx={{
                color: '#fff',
                border: `1px solid ${darken(theme.palette.primary.main, 0.2)}`,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: 'transparent',
                    borderColor: darken(theme.palette.primary.main, 0.3),
                },
            }}
        >
            {children}
        </MUIButton>
    );
}
