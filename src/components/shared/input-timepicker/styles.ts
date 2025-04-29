import { SxProps } from '@mui/material';
import { commonFontColor, commonFontSize } from 'src/theme/theme';

export const textFieldSx: SxProps = {
    '& .MuiOutlinedInput-root': {
        fontSize: `${commonFontSize}px`,
        color: commonFontColor,
        '& input': {
            fontSize: `${commonFontSize}px`,
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px',
            color: '#6B7280',
        },
    },
    '& .MuiInputLabel-root': {
        fontSize: `${commonFontSize}px`,
    },
};

export const helperTextSx: SxProps = {
    minHeight: '10px',
    fontSize: '11px',
};

export const popperSx: SxProps = {
    fontSize: `${commonFontSize}px`,
    '& .MuiMultiSectionDigitalClockSection-root': {
        '& .MuiButtonBase-root': {
            fontSize: `${commonFontSize}px`,
            padding: '4px 8px',
            borderRadius: '5px',
            color: commonFontColor,
        },
        '& .Mui-selected': {
            backgroundColor: '#33b679',
            color: '#fff',
            borderRadius: '5px',
        },
    },
    '& .MuiPickersLayout-actionBar button': {
        borderRadius: '4px',
        textTransform: 'none',
        fontSize: `${commonFontSize}px`,
        minWidth: '80px',
        padding: '4px 12px',
    },
};
