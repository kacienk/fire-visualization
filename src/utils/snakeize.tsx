export const snakeize = (obj: Record<string, any>): Record<string, any> => {
  const snakeizedObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
      const snakeValue = typeof obj[key] === 'object' ? snakeize(obj[key]) : obj[key];
      snakeizedObj[snakeKey] = snakeValue;
    }
  }

  return snakeizedObj;
};
