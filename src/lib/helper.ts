export const formatCurrencyWithDecimal = (amount: number) => {
  // @ts-ignore
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    });

    let removeNGN = formatter.format(amount);
    let formattedAmount = removeNGN.replace('NGN', '').trim();
    return formattedAmount;
};