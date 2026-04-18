export const state = {
    bill: 0,
    tip: 0,
    customTip: 0,
    people: 0,
    error: {
        people: "",
    },
};

export function setState(newState) {
    Object.assign(state, newState);
}

export function setError(field, message) {
    state.error[field] = message;
}

export function clearError(field) {
    state.error[field] = "";
}

export function hasErrors() {
    return Object.values(state.error).some(Boolean);
}