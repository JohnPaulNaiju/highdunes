import dayjs from 'dayjs';

export const toDate = (mysqlDate) => {
    const day = dayjs(mysqlDate).toDate();
    return `${day.toLocaleDateString()} at ${day.toLocaleTimeString()}`
};