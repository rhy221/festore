

 export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

export const formatDate = (date: string) => new Date(date).toLocaleString('vi-VN');

export const formatToLocalInput = (isoString: string | undefined | null) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Tính bù trừ múi giờ để input hiển thị đúng giờ địa phương
  const offset = date.getTimezoneOffset() * 60000; 
  const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
  return localISOTime;
};

