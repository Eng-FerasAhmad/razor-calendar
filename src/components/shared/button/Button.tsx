import { PropsWithChildren, ReactElement } from 'react';
import { ButtonContainer } from './styles';

interface Props {
    onClick: () => void;
    color: string;
}

export default function Button({
    children,
    onClick,
    color,
}: PropsWithChildren<Props>): ReactElement {
    return (
        <ButtonContainer onClick={onClick} color={color}>
            {children}
        </ButtonContainer>
    );
}
