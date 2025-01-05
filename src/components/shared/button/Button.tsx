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
                color: '#fff', // Use primary color for text
                border: `1px solid ${darken(theme.palette.primary.main, 0.2)}`, // Use a darkened primary color for the border
                textTransform: 'none', // Keep text casing as is
                '&:hover': {
                    backgroundColor: 'transparent', // Keep the background transparent on hover
                    borderColor: darken(theme.palette.primary.main, 0.3), // Darken the border slightly more on hover
                },
            }}
        >
            {children}
        </MUIButton>
    );
}
