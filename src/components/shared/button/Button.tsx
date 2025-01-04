import { PropsWithChildren, ReactElement } from 'react';

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
        <div onClick={onClick} color={color}>
            {children}
        </div>
    );
}
