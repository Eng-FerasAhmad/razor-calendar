import React, { useState, useEffect, useRef } from 'react';
import {
    SelectContainer,
    ValueWrapper,
    IconWrapper,
    OptionsWrapper,
    OptionItem,
} from './styles';
import ArrowDownSymbol from 'components/shared/arrow-down/ArrowDownSymbole';

interface Option<T> {
    value: T;
    label: string;
}

interface InputSelectProps<T> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    color: string;
}

export default function InputSelect<T>({
    options,
    value,
    onChange,
    color,
}: InputSelectProps<T>): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = (): void => setIsOpen((prev) => !prev);
    const handleSelect = (optionValue: T): void => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent): void => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SelectContainer ref={containerRef}>
            <ValueWrapper onClick={handleToggle} isOpen={isOpen} color={color}>
                <span>
                    {options.find((option) => option.value === value)?.label ||
                        'Select...'}
                </span>
                <IconWrapper isOpen={isOpen}>
                    <ArrowDownSymbol size={18} color="#fff" />
                </IconWrapper>
            </ValueWrapper>
            {isOpen && (
                <OptionsWrapper>
                    {options.map((option) => (
                        <OptionItem
                            key={option.value as string}
                            color={color}
                            isSelected={option.value === value}
                            isOpen={isOpen}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </OptionItem>
                    ))}
                </OptionsWrapper>
            )}
        </SelectContainer>
    );
}
