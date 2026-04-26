export function calculateTip(bill, tip, people) {
    if (people <= 0) return { tipAmount: 0, total: 0 };

    const tipPercentaje = tip / 100;

    const totatlTip = bill * tipPercentaje;

    return { 
        tipAmount: totatlTip / people,
        total: (bill + totatlTip) / people,
     };
}