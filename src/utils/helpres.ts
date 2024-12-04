export const uniqueId = (prefix = 'id_') =>
    `${prefix}${Math.random().toString(36).substr(2, 9)}`;
