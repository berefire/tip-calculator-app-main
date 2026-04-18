export function calculateTip(bill, tip, people) {
    if (people <= 0) return { tipAmount: 0, total: 0 };

    const tipAmount = (bill * tip) / 100 / people;
    const total = (bill / people) + tipAmount;

    return { tipAmount, total };
}