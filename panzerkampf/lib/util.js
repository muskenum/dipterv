/**
 * This is a utility class containing utility methods
 * used on the server and client.
 */

/**
 * Given an angle in radians, this function normalizes the angle to the range
 * 0 to 2 PI and returns the normalized angle.
 */
const normalizeAngle = angle => {
    while (angle < 0) {
        angle += Math.PI * 2;
    }
    return angle % (Math.PI * 2);
};

/**
 * Given a value, a minimum, and a maximum, returns true if value is
 * between the minimum and maximum, inclusive of both bounds. This
 * function will still work if min and max are switched.
 */
const inBound = (val, min, max) => {
    if (min > max) return val >= max && val <= min;
    return val >= min && val <= max;
};

/**
 * Bounds a number to the given minimum and maximum, inclusive of both
 * bounds. This function will still work if min and max are switched.
 */
const bound = (val, min, max) => {
    if (min > max) return Math.min(Math.max(val, max), min);
    return Math.min(Math.max(val, min), max);
};

/**
 * Returns a random floating-point number between the given min and max
 * values, exclusive of the max value.
 */
const randRange = (min, max) => {
    if (min > max) return Math.random() * (min - max) + max;
    return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between the given min and max values, exclusive
 * of the max value.
 */
const randRangeInt = (min, max) => {
    if (min > max) return Math.floor(Math.random() * (min - max) + max);
    return Math.floor(Math.random() * (max - min) + min);
};

const choiceArray = array => {
    return array[randRangeInt(0, array.length)];
};

module.exports = {
    normalizeAngle,
    inBound,
    bound,
    randRange,
    randRangeInt,
    choiceArray
};