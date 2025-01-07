import { DialogProps } from '@mui/material/Dialog';
import React, { PropsWithChildren, ReactElement } from 'react';
import {
    BootstrapDialog,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
    StyledIconButton,
} from './styles';
import CloseSymbol from 'components/shared/icons/close/CloseSymbol';

interface Props {
    handleClose?: () => void;
    title?: string;
    actions?: React.ReactNode;
    open: boolean;
    headerColor?: string;
    headerFontColor?: string;
}

export function DialogCustom({
    handleClose,
    title,
    actions,
    open,
    headerColor,
    headerFontColor,
    children,
    ...props
}: PropsWithChildren<DialogProps & Props>): ReactElement {
    const handleDialogClose = (): void => {
        if (handleClose) handleClose();
    };

    return (
        <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            {...props}
            data-testid="dialog"
        >
            {title && (
                <StyledDialogTitle
                    data-testid="dialog-title"
                    id="dialog-title"
                    headerColor={headerColor}
                    headerFontColor={headerFontColor}
                >
                    {title}
                </StyledDialogTitle>
            )}

            {handleClose && (
                <StyledIconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    data-testid="dialog-close-icon"
                >
                    <CloseSymbol size={24} />
                </StyledIconButton>
            )}

            <StyledDialogContent dividers data-testid="dialog-content">
                {children}
            </StyledDialogContent>

            {actions && (
                <StyledDialogActions data-testid="dialog-action">
                    {actions}
                </StyledDialogActions>
            )}
        </BootstrapDialog>
    );
}
