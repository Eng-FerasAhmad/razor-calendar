import styled from 'styled-components';
import { calendarConfig } from 'calendar/config';

export const LayoutContainer = styled.div`
    position: relative;
    height: calc(100vh - ${calendarConfig.toolbarHeight}px);
`;
