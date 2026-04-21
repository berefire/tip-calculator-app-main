export function sanitizeNumber(value, max = 1000000 ) {
    if (!value || isNaN(value)) return 0;
    if (value < 0) return 0;
    if (value > max) return max;
    return value;
}

export function formatCurrency(value) {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}