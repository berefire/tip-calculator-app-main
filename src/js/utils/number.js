export function sanitizeNumber(num) {
     const value = Number(num);
     if (!Number.isFinite(value)) {
        return 0;
     }
    return Math.max(0, Math.round(value * 100) / 100);
}

export function formatCurrency(value) {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

export function enforceMaxValue(event, max) {
  const input = event.target;
  const value = Number(input.value);

  if ( !Number.isNaN(value) && value > max ) {
    input.value = String(max);
  }
}

export function limitLength(event, maxLength) {
  const input = event.target;
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}