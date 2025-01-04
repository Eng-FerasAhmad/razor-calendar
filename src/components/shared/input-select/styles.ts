import { styled } from '@mui/material/styles';
import { darkenColor } from 'utils/colorConverter';

interface Props {
    isOpen: boolean;
    color?: string;
    isSelected?: boolean;
}

export const SelectContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    position: 'relative',
});

export const ValueWrapper = styled('div')<Props>(({ isOpen, color }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${isOpen ? darkenColor(color!, 30) : '#ccc'}`,
    borderRadius: '4px',
    padding: '7px 12px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    backgroundColor: 'transparent',
    color: '#fff',
    boxSizing: 'border-box',
    '&:hover': {
        boxSizing: 'border-box',
        backgroundColor: darkenColor(color!, 10),
    },
}));

export const IconWrapper = styled('div')<Props>(({ isOpen }) => ({
    fontSize: '10px',
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease',
    transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
}));

export const OptionsWrapper = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: '38px 0 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
});

export const OptionItem = styled('div')<Props>(({ isSelected, color }) => ({
    padding: '8px 10px',
    cursor: 'pointer',
    color: isSelected ? color : '',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: color,
    },
}));
