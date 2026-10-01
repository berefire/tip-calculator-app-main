const createInitialState = () => {
  return {
    bill: 0,
    tip: 0,
    customTip: 0,
    people: 0,
    errors: {
      bill: "",
      people: "",
    },
  };
};

export const state = createInitialState();

export function resetState() {
  Object.assign(state, createInitialState());
}

export function setState(newState) {
  Object.assign(state, newState);
}

export function setError(field, message) {
  state.errors[field] = message;
}

export function clearError(field) {
  state.errors[field] = "";
}

export function hasErrors() {
  return Object.values(state.errors).some(Boolean);
}
