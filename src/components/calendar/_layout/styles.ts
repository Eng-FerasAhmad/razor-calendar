import styled from 'styled-components';
import { commonSize } from 'calendar/_config/basicConfig';

export const LayoutContainer = styled.div`
    position: relative;
    height: calc(100vh - ${commonSize.toolbarHeight}px);
    min-width: 700px;
`;
