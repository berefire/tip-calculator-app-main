import { VALIDATION_LIMITS } from "./config/limits.js";

export function validatePeople(value) {
    if (!value || value <= VALIDATION_LIMITS.PEOPLE_NUMBER.MIN) {
        return "Please enter at least 1 person";
    }

    if ( value > VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_VALIDATION ) {
        return "Too many people";   
    }

    return "";
}

export function validateBill(value) {
    const num = Number(value);

    if(Number.isNaN(num)) {
        return "Enter a valid number";
    }
    if ( num < VALIDATION_LIMITS.BILL_AMOUNT.MIN ) {
        return `Amount must be at least ${VALIDATION_LIMITS.BILL_AMOUNT.MIN}`;
    }
    if ( num > VALIDATION_LIMITS.BILL_AMOUNT.MAX_VALIDATION ) {
        return `Amount must be less than ${VALIDATION_LIMITS.BILL_AMOUNT.MAX_VALIDATION}`;
    }

    return "";

}