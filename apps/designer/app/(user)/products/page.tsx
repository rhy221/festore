"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  ProductActionModal,
  SalesTypeModal,
  DirectSaleModal,
  AuctionModal,
  Product,
  DirectSaleData,
  AuctionSetupData,
} from "../../../components/product-modals";

// ==================== API DATA INTERFACES ====================
// Interfaces are now imported from components/product-modals/types.ts

// Function to get saleType display text based on status
const getSaleTypeDisplay = (status: Product["status"]): string => {
  switch (status) {
    case "direct-sale":
      return "Bán trực tiếp";
    case "auction":
      return "Bán đấu giá";
    case "available":
    default:
      return "Chọn hình thức";
  }
};

export default function ProductListScreen() {
  // ==================== API INTEGRATION GUIDE ====================
  //
  // ELEMENTS POPULATED FROM API DATA:
  //
  // 1. PRODUCT LIST TABLE:
  //    - products[] array → Full product list with pagination
  //    - product.id → Unique product identifier
  //    - product.name → Product display name
  //    - product.mainImage/images[0] → Product thumbnail
  //    - product.status → Sale status (draft, available, direct-sale, auction, sold)
  //    - product.salePrice → Direct sale price (if applicable)
  //    - product.auctionDetails → Auction info (if applicable)
  //    - product.createdAt → Product creation date
  //    - product.designer → Designer information
  //
  // 2. DIRECT SALE MODAL:
  //    - selectedProduct.name → Product name display
  //    - selectedProduct.mainImage → Product image in modal
  //    - salePrice input → Price to be sent to API
  //
  // 3. AUCTION SETUP MODAL:
  //    - selectedProduct.name → Product name display
  //    - selectedProduct.mainImage → Product image in modal
  //    - startingPrice input → Starting bid amount
  //    - bidIncrement input → Minimum bid increment
  //    - startTime input → Auction start time
  //    - endTime input → Auction end time
  //
  // 4. PRODUCT ACTIONS:
  //    - View → Navigate to product details page
  //    - Edit → Navigate to product edit page
  //    - Delete → Remove product (with confirmation)
  //
  // API FUNCTIONS TO IMPLEMENT:
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalCount: 0 });
  //
  // - fetchProducts(page?: number, filters?: object): Promise<ProductListApiResponse>
  // - createDirectSale(data: DirectSaleData): Promise<ProductActionApiResponse>
  // - createAuction(data: AuctionSetupData): Promise<ProductActionApiResponse>
  // - updateProduct(id: string, data: Partial<Product>): Promise<ProductActionApiResponse>
  // - deleteProduct(id: string): Promise<{ success: boolean; message?: string }>
  // - uploadProductImage(file: File): Promise<{ success: boolean; url: string }>
  //
  // REAL-TIME UPDATES NEEDED:
  // - Product status changes (when auctions start/end)
  // - Auction current prices (live bidding updates)
  // - New products added by designer
  // - Product availability changes
  //
  // PAGINATION & FILTERING:
  // - Page-based pagination for large product lists
  // - Status filtering (all, available, on-sale, in-auction)
  // - Date range filtering (created date)
  // - Search by product name
  // ============================================================

  // Mock data with API-ready structure
  const [products] = useState<Product[]>([
    {
      id: "prod_001",
      name: "Giày thể thao",
      description: "Giày thể thao nam chất lượng cao",
      category: "Giày dép",
      material: "Da thật, cao su",
      images: ["/images/shoe.png", "/images/shoe_2.png"],
      mainImage: "/images/shoe.png",
      designerId: "designer_001",
      designer: {
        id: "designer_001",
        name: "Nhà thiết kế A",
        email: "designer_a@example.com",
      },
      status: "available",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "prod_002",
      name: "Giày thể thao 2",
      description: "Mẫu giày thể thao phong cách",
      category: "Giày dép",
      material: "Vải, cao su",
      images: ["/images/shoe2.png"],
      mainImage: "/images/shoe2.png",
      designerId: "designer_001",
      designer: {
        id: "designer_001",
        name: "Nhà thiết kế A",
        email: "designer_a@example.com",
      },
      status: "available",
      createdAt: "2024-01-16T10:00:00Z",
      updatedAt: "2024-01-16T10:00:00Z",
    },
    {
      id: "prod_003",
      name: "Áo thun Premium",
      description: "Áo thun chất lượng cao cấp",
      category: "Quần áo",
      material: "Cotton 100%",
      images: ["/images/tshirt.png"],
      mainImage: "/images/tshirt.png",
      designerId: "designer_001",
      designer: {
        id: "designer_001",
        name: "Nhà thiết kế A",
        email: "designer_a@example.com",
      },
      status: "direct-sale",
      salePrice: 250000,
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z",
    },
    {
      id: "prod_004",
      name: "Quần jean cao cấp",
      description: "Quần jean chất lượng cao",
      category: "Quần áo",
      material: "Denim",
      images: ["/images/jeans.png"],
      mainImage: "/images/jeans.png",
      designerId: "designer_001",
      designer: {
        id: "designer_001",
        name: "Nhà thiết kế A",
        email: "designer_a@example.com",
      },
      status: "auction",
      auctionDetails: {
        startingPrice: 500000,
        bidIncrement: 50000,
        startTime: "2024-01-20T09:00:00Z",
        endTime: "2024-01-22T18:00:00Z",
        currentPrice: 650000,
        totalBids: 12,
        isActive: true,
      },
      createdAt: "2024-01-18T10:00:00Z",
      updatedAt: "2024-01-18T10:00:00Z",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showSalesTypeModal, setShowSalesTypeModal] = useState(false);
  const [selectedProductForSales, setSelectedProductForSales] = useState<
    string | null
  >(null);
  const [showDirectSaleModal, setShowDirectSaleModal] = useState(false);
  const [showAuctionModal, setShowAuctionModal] = useState(false);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        (showActionModal ||
          showSalesTypeModal ||
          showDirectSaleModal ||
          showAuctionModal)
      ) {
        closeModal();
        closeSalesTypeModal(true);
        closeDirectSaleModal();
        closeAuctionModal();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [
    showActionModal,
    showSalesTypeModal,
    showDirectSaleModal,
    showAuctionModal,
  ]);

  const handleAddProduct = () => {
    window.location.href = "/products/upload";
  };

  const handleViewDetails = (productId: string) => {
    setSelectedProduct(productId);
    setShowActionModal(true);
  };

  const closeModal = () => {
    setShowActionModal(false);
    setSelectedProduct(null);
  };

  const closeSalesTypeModal = (clearSelection: boolean = true) => {
    setShowSalesTypeModal(false);
    if (clearSelection) {
      setSelectedProductForSales(null);
    }
  };

  const closeDirectSaleModal = () => {
    setShowDirectSaleModal(false);
  };

  const closeAuctionModal = () => {
    setShowAuctionModal(false);
  };

  const handleSalesTypeClick = (productId: string) => {
    setSelectedProductForSales(productId);
    setShowSalesTypeModal(true);
  };

  const handleAction = (action: "view" | "edit" | "delete") => {
    console.log(`${action} product:`, selectedProduct);
    closeModal();

    if (action === "view") {
      // TODO: Navigate to product details page
      // window.location.href = `/designer/products/${selectedProduct}/view`;
      // OR: router.push(`/designer/products/${selectedProduct}/view`);
    } else if (action === "edit") {
      // TODO: Navigate to product edit page
      // window.location.href = `/designer/products/${selectedProduct}/edit`;
      // OR: router.push(`/designer/products/${selectedProduct}/edit`);
    } else if (action === "delete") {
      // TODO: Call delete product API
      // if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      //   deleteProduct(selectedProduct!)
      //     .then(() => {
      //       // Refresh product list
      //       fetchProducts();
      //       // Show success message
      //     })
      //     .catch(error => {
      //       // Show error message
      //       console.error('Delete failed:', error);
      //     });
      // }
    }
  };

  return (
    <div>
      {/* Click outside overlay - invisible but captures clicks */}
      {showActionModal && (
        <div className="fixed inset-0 z-40" onClick={closeModal}></div>
      )}
      {/* Main content with blur effect when modals are open */}
      <div
        className={`${
          showSalesTypeModal || showDirectSaleModal || showAuctionModal
            ? "blur-sm"
            : ""
        } transition-all duration-300 pt-24`}
      >
        <main className="container mx-auto px-8 py-8">
          {/* Title and Add Button */}
          <div className="flex justify-between items-center mb-8 mt-4">
            <h1 className="text-3xl font-black text-gray-800 flex-shrink-0">
              Danh sách mẫu
            </h1>
            <Button
              onClick={handleAddProduct}
              className="px-6 py-3 text-white rounded-full font-medium shadow-md transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "#000080" }}
            >
              Thêm mẫu
            </Button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden relative mb-8">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-200">
              <div className="p-4 font-semibold text-gray-700 text-center">
                Mẫu
              </div>
              <div className="p-4 font-semibold text-gray-700 text-center border-l border-gray-200">
                Hình thức bán
              </div>
              <div className="p-4 font-semibold text-gray-700 text-center border-l border-gray-200">
                Thao tác
              </div>
            </div>

            {/* Table Body - Scrollable */}
            <div className="overflow-y-auto max-h-96">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {/* Product Column */}
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      {/* Shoe Icon - You can replace with actual product image */}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gray-600"
                      >
                        <path
                          d="M2 18h20l-2-6H4l-2 6zM6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">
                      {product.name}
                    </span>
                  </div>

                  {/* Sales Type Column */}
                  <div className="p-4 flex items-center justify-center border-l border-gray-200">
                    <span
                      {...(product.status === "available" && {
                        onClick: () => handleSalesTypeClick(product.id),
                      })}
                      className={`text-sm font-medium ${
                        product.status === "available"
                          ? "cursor-pointer"
                          : "cursor-default"
                      } ${
                        product.status === "direct-sale" ||
                        product.status === "auction"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {getSaleTypeDisplay(product.status)}
                    </span>
                  </div>

                  {/* Actions Column */}
                  <div className="p-4 flex items-center justify-center border-l border-gray-200 relative">
                    <button
                      onClick={() => handleViewDetails(product.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors cursor-pointer"
                    >
                      Chi tiết
                    </button>

                    {/* Dropdown Modal */}
                    <ProductActionModal
                      isOpen={showActionModal && selectedProduct === product.id}
                      onClose={closeModal}
                      onAction={handleAction}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State (if no products) */}
            {products.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <div className="mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto text-gray-300"
                  >
                    <path
                      d="M20 7H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">
                  Chưa có mẫu thiết kế nào
                </p>
                <p className="text-sm mb-4">
                  Thêm mẫu thiết kế đầu tiên của bạn
                </p>
                <Button
                  onClick={handleAddProduct}
                  className="px-6 py-2 text-white rounded-full font-medium"
                  style={{ backgroundColor: "#000080" }}
                >
                  Thêm mẫu
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Sales Type Selection Modal */}
      <SalesTypeModal
        isOpen={showSalesTypeModal}
        onClose={() => closeSalesTypeModal(true)}
        onConfirm={(salesType) => {
          if (salesType === "direct") {
            closeSalesTypeModal(false);
            setShowDirectSaleModal(true);
          } else if (salesType === "auction") {
            closeSalesTypeModal(false);
            setShowAuctionModal(true);
          }
        }}
      />

      {/* Direct Sale Modal */}
      <DirectSaleModal
        isOpen={showDirectSaleModal}
        product={products.find((p) => p.id === selectedProductForSales) || null}
        onClose={closeDirectSaleModal}
        onConfirm={(price) => {
          console.log(
            `Direct sale price set: ${price} VND for product:`,
            selectedProductForSales
          );

          // TODO: Call API to set up direct sale
          // const directSaleData: DirectSaleData = {
          //   productId: selectedProductForSales!,
          //   price: parseFloat(price.replace(/,/g, '')),
          //   currency: 'VND'
          // };
          //
          // createDirectSale(directSaleData)
          //   .then(response => {
          //     if (response.success) {
          //       // Update local product list
          //       setProducts(prev => prev.map(p =>
          //         p.id === selectedProductForSales
          //           ? { ...p, status: 'direct-sale', salePrice: directSaleData.price }
          //           : p
          //       ));
          //       // Show success message
          //       closeDirectSaleModal();
          //     }
          //   })
          //   .catch(error => {
          //     // Show error message
          //     console.error('Direct sale setup failed:', error);
          //   });

          closeDirectSaleModal();
        }}
      />

      {/* Auction Modal */}
      <AuctionModal
        isOpen={showAuctionModal}
        product={products.find((p) => p.id === selectedProductForSales) || null}
        onClose={closeAuctionModal}
        onConfirm={({ startingPrice, bidIncrement, startTime, endTime }) => {
          console.log(
            `Auction setup - Starting Price: ${startingPrice} VND, Bid Increment: ${bidIncrement} VND, Start: ${startTime}, End: ${endTime} for product:`,
            selectedProductForSales
          );

          // TODO: Call API to set up auction
          // const auctionData: AuctionSetupData = {
          //   productId: selectedProductForSales!,
          //   startingPrice: parseFloat(startingPrice.replace(/,/g, '')),
          //   bidIncrement: parseFloat(bidIncrement.replace(/,/g, '')),
          //   startTime: `${startTime}:00`, // Convert to full datetime
          //   endTime: `${endTime}:00`     // Convert to full datetime
          // };
          //
          // createAuction(auctionData)
          //   .then(response => {
          //     if (response.success) {
          //       // Update local product list
          //       setProducts(prev => prev.map(p =>
          //         p.id === selectedProductForSales
          //           ? {
          //               ...p,
          //               status: 'auction',
          //               auctionDetails: {
          //                 ...auctionData,
          //                 currentPrice: auctionData.startingPrice,
          //                 totalBids: 0,
          //                 isActive: false // Will be activated at startTime
          //               }
          //             }
          //           : p
          //       ));
          //       // Show success message
          //       closeAuctionModal();
          //     }
          //   })
          //   .catch(error => {
          //     // Show error message
          //     console.error('Auction setup failed:', error);
          //   });

          closeAuctionModal();
        }}
      />
    </div>
  );
}
