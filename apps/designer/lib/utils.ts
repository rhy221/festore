import toast from "react-hot-toast";


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
export async function copyToClipboard(text?: string, onlyPath: boolean = false): Promise<boolean> {
  // Kiểm tra xem trình duyệt có hỗ trợ clipboard API không (môi trường server sẽ không có window)
  if (typeof window === 'undefined' || !navigator.clipboard) {
    console.warn('Clipboard API not supported');
    return false;
  }

  try {
    let contentToCopy = text;

    // Nếu không truyền text, tự động lấy từ URL trình duyệt
    if (!contentToCopy) {
      if (onlyPath) {
        // Lấy path + query string (ví dụ: /store?page=1)
        contentToCopy = window.location.pathname + window.location.search;
      } else {
        // Lấy full URL (ví dụ: https://domain.com/store?page=1)
        contentToCopy = window.location.href;
      }
    }

    await navigator.clipboard.writeText(contentToCopy);
    toast.success("Copied link")
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}
