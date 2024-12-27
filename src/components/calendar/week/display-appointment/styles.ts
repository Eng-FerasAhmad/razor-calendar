import styled from 'styled-components';

interface Props {
    top: string;
    height: string;
    backgroundColor: string;
}

export const DisplayAppointmentContainer = styled.div<Props>`
    position: absolute;
    left: 1px;
    right: 1px;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    padding: 0 8px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: ${(props) => props.backgroundColor};
    top: ${(props) => props.top};
    height: ${(props) => props.height};
`;
