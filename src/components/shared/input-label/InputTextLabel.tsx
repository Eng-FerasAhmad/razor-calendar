import InputLabel from '@mui/material/InputLabel';
import { ReactElement } from 'react';

interface Props {
    text: string;
}

export default function InputTextLabel({ text }: Props): ReactElement {
    return (
        <InputLabel
            sx={{
                fontSize: '15px',
                minWidth: '50px',
                color: '#575757',
                fontWeight: 600,
            }}
        >
            {text}
        </InputLabel>
    );
}
