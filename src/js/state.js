export const state = {
    bill: 0,
    tip: 0,
    customTip: 0,
    people: 0,
    errors: {
        bill: "",
        people: "",
    },
};

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