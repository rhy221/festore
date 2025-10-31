// ==================== SHARED TYPES FOR PRODUCT MODALS ====================

export interface Designer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  material: string;
  images: string[];
  mainImage?: string;
  designerId: string;
  designer: Designer;
  status:
    | "draft"
    | "available"
    | "direct-sale"
    | "auction"
    | "sold"
    | "archived";
  isPublic?: boolean; // Privacy setting: true = "Công khai", false = "Riêng tư"
  createdAt: string;
  updatedAt: string;
  // Direct sale specific
  salePrice?: number;
  // Auction specific
  auctionDetails?: {
    startingPrice: number;
    bidIncrement: number;
    startTime: string;
    endTime: string;
    currentPrice?: number;
    totalBids?: number;
    isActive?: boolean;
  };
}

export interface DirectSaleData {
  productId: string;
  price: number;
  currency: string;
}

export interface AuctionSetupData {
  productId: string;
  startingPrice: number;
  bidIncrement: number;
  startTime: string;
  endTime: string;
}

// API Response Interfaces
export interface ProductListApiResponse {
  success: boolean;
  data: {
    products: Product[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
  message?: string;
}

export interface ProductActionApiResponse {
  success: boolean;
  data: Product;
  message?: string;
}
