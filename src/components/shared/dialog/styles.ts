import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { pixelToRem } from 'utils/common';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
        fontSize: pixelToRem(16),
        border: 0,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
        maxWidth: 1000,
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
    },
}));

export const StyledDialogTitle = styled(DialogTitle, {
    shouldForwardProp: (prop) =>
        prop !== 'headerColor' && prop !== 'headerFontColor',
})<{
    headerColor?: string;
    headerFontColor?: string;
}>`
    background-color: ${({ headerColor }) => headerColor || 'transparent'};
    color: ${({ headerFontColor }) => headerFontColor || 'inherit'};
    padding: 16px 16px 5px 16px;
    font-family: inherit;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    gap: 8px;
`;

export const DialogDescriptionWrapper = styled('div')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: pixelToRem(14),
    padding: '0 16px',
    fontFamily: 'inherit',
}));

export const StyledIconButton = styled(IconButton)`
    padding: 4px;
    svg {
        width: 18px;
        height: 18px;
    }
`;

export const StyledDialogContent = styled(DialogContent)`
    font-family: inherit;
    padding: ${pixelToRem(16, 24)};
    margin: 0;
`;

export const StyledDialogActions = styled(DialogActions)`
    font-family: inherit;
    margin: ${pixelToRem(16, 24)};
    padding: 0;
`;
