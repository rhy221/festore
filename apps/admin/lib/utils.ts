

 export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const formatDate = (date: string) => new Date(date).toLocaleString('vi-VN');