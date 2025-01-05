import { ReactElement } from 'react';

interface ArrowDownSymbolProps {
    size?: number;
    color?: string;
}

export default function ArrowUpSymbol({
    size = 36,
    color = '#171717',
}: ArrowDownSymbolProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Down arrow icon"
        >
            <path
                d="M19.9201 15.0501L13.4001 8.53014C12.6301 7.76014 11.3701 7.76014 10.6001 8.53014L4.08008 15.0501"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
