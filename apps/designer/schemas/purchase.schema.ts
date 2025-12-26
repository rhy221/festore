export type Purchase = {
  userId: string;

  product: {
    _id: string;

    imageUrls: string[];

    title: string;

    designerId: string;
    
    designerName: string;
  }
 
  orderId: string;

  downloadCount: number;

  lastDownloadAt: string;
}