import { VALIDATION_LIMITS } from "./config/limits.js";

export function validatePeople(value) {
    const num = Number(value);

    if (!Number.isInteger(num)) {
        return "Must be an integer";
    }

    if ( num < VALIDATION_LIMITS.PEOPLE_NUMBER.MIN ) {
        return `Minimum is ${VALIDATION_LIMITS.PEOPLE_NUMBER.MIN} person`;
    } 

    if ( num > VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_VALIDATION ) {
        return `Maximum is ${VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_VALIDATION} people`;   
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