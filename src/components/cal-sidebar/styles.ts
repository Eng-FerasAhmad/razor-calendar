import styled from 'styled-components';

interface Props {
    collapsed: boolean;
}

export const CalSidebarContainer = styled.div<Props>`
    width: ${(props) => (props.collapsed ? '0' : '250px')};
    height: 100vh;
    transition: width 0.3s;
    position: fixed;
    overflow: hidden;
    left: 0;
`;

export const SidebarContent = styled.div<Props>`
    padding: 0;
    display: ${(props) => (props.collapsed ? 'none' : 'block')};
`;
