import { ReactElement } from 'react';

interface ReverseArrowIconProps {
    size?: number;
    color?: string;
}

export default function ArrowPrevSymbol({
    size = 36,
    color = '#171717',
}: ReverseArrowIconProps): ReactElement {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Reverse arrow icon"
        >
            <path
                d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
