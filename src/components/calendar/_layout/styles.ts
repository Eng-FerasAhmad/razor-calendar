import { styled } from '@mui/material/styles';

interface LayoutContainerProps {
    top?: string | number; // Define the `top` prop
}

export const LayoutContainer = styled('div')<LayoutContainerProps>(() => ({
    position: 'relative',
    height: `calc(100vh - 60px)`,
    backgroundColor: '#fff',
    overflow: 'auto',
}));
