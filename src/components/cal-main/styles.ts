import styled from 'styled-components';

interface Props {
    collapsed: boolean;
}

export const CalMainContainer = styled.div<Props>`
    margin-left: ${(props) => (props.collapsed ? '0' : '250px')};
    transition: margin-left 0.3s;
    flex-grow: 1;
`;
