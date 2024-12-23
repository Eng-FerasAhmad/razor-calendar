import styled from 'styled-components';

interface Props {
    color: string;
}

export const MonthEventContainer = styled.div<Props>`
    background-color: ${(props) => props.color};
    color: #fff;
    padding: 2px 5px;
    border-radius: 7px;
    font-size: 10px;
    height: 20px;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
`;
