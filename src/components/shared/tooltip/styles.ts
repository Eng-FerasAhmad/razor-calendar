import Popup from 'reactjs-popup';
import styled from 'styled-components';

export const StyledPopup = styled(Popup)`
    &-overlay {
    }
    // use your custom style for ".popup-content"
    &-content {
        width: fit-content !important;
        height: fit-content !important;
        padding: 0 5px;
        font-size: 12px;
    }
`;
