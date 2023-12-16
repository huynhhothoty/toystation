export function formatCurrency(money) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const formattedNumber = formatter.format(money);

    return formattedNumber;
}
