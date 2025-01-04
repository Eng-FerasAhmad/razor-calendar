import { styled } from '@mui/material/styles';

const StyledSvg = styled('svg')<{ hoverColor: string; defaultColor: string }>(
    ({ hoverColor, defaultColor }) => ({
        transition: 'stroke 0.3s ease',
        stroke: defaultColor, // Set the default color
        '&:hover': {
            stroke: hoverColor, // Set the hover color
        },
    })
);

export default StyledSvg;
