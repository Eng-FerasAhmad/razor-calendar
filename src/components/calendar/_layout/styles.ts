import { styled } from '@mui/material/styles';

interface LayoutContainerProps {
    top?: number;
}

export const LayoutContainer = styled('div')<LayoutContainerProps>(
    ({ top = 0 }) => ({
        position: 'relative',
        height: `calc(100vh - 3px - ${top}px)`,
        backgroundColor: '#fff',
        overflow: 'auto',
    })
);
