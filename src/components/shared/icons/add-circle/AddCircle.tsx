import { ReactElement, useState } from 'react';
import StyledSvg from 'components/shared/icons/add-circle/styles';

interface PlusSymbolProps {
    size?: number;
    color?: string;
    hoverColor?: string;
    opacity?: number;
    onClick?: () => void;
}

export default function PlusSymbol({
    size = 36,
    color = '#171717',
    hoverColor = '#ff5722', // Default hover color
    opacity = 0.4,
    onClick,
}: PlusSymbolProps): ReactElement {
    const [currentColor, setCurrentColor] = useState(color);

    return (
        <StyledSvg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Plus icon"
            hoverColor={hoverColor}
            defaultColor={color}
            onMouseEnter={() => setCurrentColor(hoverColor)}
            onMouseLeave={() => setCurrentColor(color)}
            onClick={onClick}
        >
            <path
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                stroke={currentColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g opacity={opacity}>
                <path
                    d="M8 12H16"
                    stroke={currentColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 16V8"
                    stroke={currentColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </StyledSvg>
    );
}
