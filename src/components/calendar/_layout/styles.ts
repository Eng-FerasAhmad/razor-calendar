import { styled } from '@mui/material/styles';

interface LayoutContainerProps {
    top?: string | number; // Define the `top` prop
}

export const LayoutContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'top', // Ensure the `top` prop is not passed to the DOM
})<LayoutContainerProps>(({ top }) => ({
    position: 'relative',
    height: `calc(100vh - ${top}px)`,
    minWidth: '710px',
}));
