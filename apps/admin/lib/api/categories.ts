export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  imageUrl?: string;
}

// Mock API - Thay thế bằng API thật sau
const mockCategories: Category[] = [
  {
    id: "1",
    name: "GIÀY",
    description: "Giày là nhóm các mẫu giày được phân loại theo kiểu dáng và công dụng như giày thể thao, giày công sở, giày boot, giày sandal, mỗi loại phù hợp với mục đích sử dụng và phong cách khác nhau.",
    imageUrl: "https://picsum.photos/seed/shoes/400/300",
    productCount: 6,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    name: "DẠ HỘI",
    description: "Trang phục dạ hội cao cấp",
    imageUrl: "https://picsum.photos/seed/evening/400/300",
    productCount: 4,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "3",
    name: "ĐƯỜNG PHỐ",
    description: "Thời trang đường phố năng động",
    imageUrl: "https://picsum.photos/seed/street/400/300",
    productCount: 3,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    name: "PHỤ KIỆN",
    description: "Các phụ kiện thời trang đa dạng",
    imageUrl: "https://picsum.photos/seed/accessories/400/300",
    productCount: 5,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "5",
    name: "UNISEX",
    description: "Thời trang unisex cho mọi giới tính",
    imageUrl: "https://picsum.photos/seed/unisex/400/300",
    productCount: 8,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "6",
    name: "TRẺ EM",
    description: "Thời trang dành cho trẻ em",
    imageUrl: "https://picsum.photos/seed/kids/400/300",
    productCount: 7,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
];

const mockProducts: Product[] = [
  { id: "1", name: "Giày Grand Sport", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe1/400/300", createdAt: "2024-01-01" },
  { id: "2", name: "Giày Sunday Chunky", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe2/400/300", createdAt: "2024-01-02" },
  { id: "3", name: "Giày Yueying 3 Nam", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe3/400/300", createdAt: "2024-01-03" },
  { id: "4", name: "Giày Grand Sport 2", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe4/400/300", createdAt: "2024-01-04" },
  { id: "5", name: "Giày Sunday Chunky 2", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe5/400/300", createdAt: "2024-01-05" },
  { id: "6", name: "Giày Yueying 3 Nam 2", categoryId: "1", imageUrl: "https://picsum.photos/seed/shoe6/400/300", createdAt: "2024-01-06" },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const categoriesApi = {
  // GET all categories
  getAll: async (search?: string): Promise<Category[]> => {
    await delay(500);
    if (search) {
      return mockCategories.filter(cat => 
        cat.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return [...mockCategories];
  },

  // GET single category
  getById: async (id: string): Promise<Category | null> => {
    await delay(300);
    return mockCategories.find(cat => cat.id === id) || null;
  },

  // CREATE category
  create: async (data: CreateCategoryDto): Promise<Category> => {
    await delay(500);
    const newCategory: Category = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  // UPDATE category
  update: async (id: string, data: UpdateCategoryDto): Promise<Category> => {
    await delay(500);
    const existingCategory = mockCategories.find(cat => cat.id === id);
    if (!existingCategory) throw new Error("Category not found");
    
    const updatedCategory: Category = {
      id: existingCategory.id,
      name: data.name !== undefined ? data.name : existingCategory.name,
      description: data.description !== undefined ? data.description : existingCategory.description,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : existingCategory.imageUrl,
      productCount: existingCategory.productCount,
      createdAt: existingCategory.createdAt,
      updatedAt: new Date().toISOString(),
    };
    
    const index = mockCategories.findIndex(cat => cat.id === id);
    mockCategories[index] = updatedCategory;
    return updatedCategory;
  },

  // DELETE category
  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockCategories.findIndex(cat => cat.id === id);
    if (index === -1) throw new Error("Category not found");
    mockCategories.splice(index, 1);
  },

  // GET products by category
  getProducts: async (categoryId: string, search?: string): Promise<Product[]> => {
    await delay(500);
    let products = mockProducts.filter(p => p.categoryId === categoryId);
    
    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return products;
  },
};