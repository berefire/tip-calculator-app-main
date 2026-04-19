export function validatePeople(value) {
    if (!value || value <= 0) {
        return "Can't be zero";
    }

    return "";
}