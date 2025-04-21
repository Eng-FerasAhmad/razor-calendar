import { DialogProps } from '@mui/material/Dialog';
import { CloseOutline } from 'razor-icon-library';
import React, { PropsWithChildren, ReactElement } from 'react';
import {
    BootstrapDialog,
    DialogDescriptionWrapper,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
    StyledIconButton,
} from './styles';

interface Props {
    handleClose?: () => void;
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    open: boolean;
    headerColor?: string;
    headerFontColor?: string;
}

export function DialogCustom({
    handleClose,
    title,
    description,
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
                    {handleClose && (
                        <StyledIconButton
                            aria-label="close"
                            onClick={handleDialogClose}
                            data-testid="dialog-close-icon"
                        >
                            <CloseOutline size={18} />
                        </StyledIconButton>
                    )}
                </StyledDialogTitle>
            )}
            {description && (
                <DialogDescriptionWrapper
                    data-testid="dialog-description"
                    id="dialog-description"
                >
                    {description}
                </DialogDescriptionWrapper>
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
