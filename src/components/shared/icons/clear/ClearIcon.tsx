import { ReactElement } from 'react';

interface IconProps {
    size?: number;
    color?: string;
}

export function ClearIcon({
    size = 24,
    color = '#33363F',
}: IconProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 6L6 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
            />
            <path
                d="M6 6L18 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
            />
        </svg>
    );
}
