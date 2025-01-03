import styled from 'styled-components';

interface Props {
    color: string;
}

export const FullDaysEventHeaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const FullDaysEventHeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    height: 23px;
`;

export const PointWrapper = styled.span<Props>`
    height: 5px;
    width: 5px;
    min-height: 5px;
    min-width: 5px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
`;

export const EventTitleWrapper = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    width: auto;
`;

export const ArrowWrapper = styled.div`
    height: 10px;
    width: 10px;
    min-height: 10px;
    min-width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TitlePointWrapper = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: flex-start;
`;

export const FullDayEventWrapper = styled.div`
    position: absolute;
    border-radius: 4px;
    background-color: ${(props) => props.theme.primaryColor || '#007bff'};
    color: white;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const FullDayEventContent = styled.div`
    padding: 4px;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
