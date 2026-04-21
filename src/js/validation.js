export function validatePeople(value) {
    if (!value || value <= 0) {
        return "Can't be zero";
    }

    if ( value > 100 ) {
        return "Too many people";   
    }

    return "";
}