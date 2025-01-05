import { ReactElement } from 'react';

interface CloseIconProps {
    size?: number;
    color?: string;
}

export default function CloseIcon({
    size = 24,
    color = '#33363F',
}: CloseIconProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Close icon"
        >
            <path
                d="M18 6L6 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 6L18 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
