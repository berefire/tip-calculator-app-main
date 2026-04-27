export function calculateTip(bill, tip, people) {
    if (people <= 0) return { tipAmount: 0, total: 0 };

    const tipPercentage = tip / 100;

    const totalTip = bill * tipPercentage;

    return { 
        tipAmount: totalTip / people,
        total: (bill + totalTip) / people,
     };
}