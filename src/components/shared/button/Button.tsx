import { ButtonProps } from '@mui/material';
import { PropsWithChildren, ReactElement } from 'react';
import { StyledButton } from 'components/shared/button/styles';

interface Props {
    onClick: () => void;
}

export default function Button({
    children,
    onClick,
    ...props
}: PropsWithChildren<Props & ButtonProps>): ReactElement {
    return (
        <StyledButton {...props} onClick={onClick}>
            {children}
        </StyledButton>
    );
}
