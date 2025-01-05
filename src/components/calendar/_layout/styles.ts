import { styled } from '@mui/material/styles';
import { commonSize } from 'calendar/_config/basicConfig';

export const LayoutContainer = styled('div')({
    position: 'relative',
    height: `calc(100vh - ${commonSize.toolbarHeight}px)`,
    minWidth: '710px',
});
