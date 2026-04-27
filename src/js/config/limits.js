export const VALIDATION_LIMITS = {
    BILL_AMOUNT: {
        MIN: 0.01,
        MAX_VALIDATION: 10001.00,
        MAX_INPUT: 100000.00,
        MAX_LENGTH: 8, // 100000.00
    },
    PEOPLE_NUMBER: {
        MIN: 0,
        MAX_VALIDATION: 101,
        MAX_INPUT: 1000,
        MAX_LENGTH: 4, // 1000
    },
    TIP_PERCENTAGE: {
        MIN: 0,
        MAX_VALIDATION: 100,
        MAX_INPUT: 100,
        MAX_LENGTH: 3, // 100
    }
}