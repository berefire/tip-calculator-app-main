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

export function enforceMaxValue(e, max) {
  const value = Number(e.target.value);

  if (value > max) {
    e.target.value = max;
  }
}

export function limitLength(e, maxLength) {
  if (e.target.value.length > maxLength) {
    e.target.value = e.target.value.slice(0, maxLength);
  }
}