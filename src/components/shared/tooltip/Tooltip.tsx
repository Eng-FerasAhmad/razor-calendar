import { ReactElement } from 'react';
import 'reactjs-popup/dist/index.css';
import { StyledPopup } from 'components/shared/tooltip/styles';

interface Props {
    text: string;
    children: ReactElement;
}

export default function Tooltip({ text, children }: Props): ReactElement {
    return (
        <StyledPopup
            trigger={children}
            on={['hover', 'focus']}
            position={['bottom center', 'bottom right', 'bottom left']}
            closeOnDocumentClick
        >
            <span>{text}</span>
        </StyledPopup>
    );
}
