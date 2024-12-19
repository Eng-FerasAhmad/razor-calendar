export const isWorkTime = (
    hour: number,
    startWorkHour: number,
    endWorkHour: number
): boolean => {
    return hour >= startWorkHour && hour <= endWorkHour;
};
