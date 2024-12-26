import React, { useState } from 'react';
import {
    SelectContainer,
    ValueWrapper,
    IconWrapper,
    OptionsWrapper,
    OptionItem,
} from './styles';

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

    const handleToggle = (): void => setIsOpen((prev) => !prev);
    const handleSelect = (optionValue: T): void => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <SelectContainer>
            <ValueWrapper onClick={handleToggle} isOpen={isOpen} color={color}>
                <span>
                    {options.find((option) => option.value === value)?.label ||
                        'Select...'}
                </span>
                <IconWrapper>{isOpen ? '▲' : '▼'}</IconWrapper>
            </ValueWrapper>
            {isOpen && (
                <OptionsWrapper>
                    {options.map((option) => (
                        <OptionItem
                            key={option.value as string}
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
