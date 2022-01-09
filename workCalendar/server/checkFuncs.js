import { PUNCH_IN, PUNCH_OUT } from "../constants.js";

const checkNumber = (num) => {
  return num && !isNaN(num);
};

const checkId = (id) => {
  return checkNumber(id);
};

const checkTime = (time) => {
  return checkNumber(time);
};

const checkAction = (action) => {
  return action && (action === PUNCH_IN || action === PUNCH_OUT);
};

export { checkId, checkTime, checkAction };
