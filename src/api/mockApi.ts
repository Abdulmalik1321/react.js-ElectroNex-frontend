// Mock API Service for Frontend Preview
import productsData from '../mockData/products.json';
import categoriesData from '../mockData/categories.json';
import brandsData from '../mockData/brands.json';
import { Product, UserInfo } from '@/types';

// Simulated delay to mimic API calls
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers: Record<string, UserInfo> = {
  'admin@admin.com': {
    email: 'admin@admin.com',
    firstName: 'Admin',
    id: 'user-001',
    lastName: 'User',
    phone: '+1234567890',
    role: 1, // Admin role
    token: 'mock-jwt-token-12345',
  },
};

// Mock wishlist storage
let mockWishlists: Record<string, string[]> = {};

class MockAPI {
  // Authentication
  async signin(email: string, password: string): Promise<string> {
    await delay();
    
    // Check for admin/admin login
    if (email === 'admin@admin.com' && password === 'admin') {
      return mockUsers['admin@admin.com'].token;
    }
    
    // Allow any email/password for demo purposes
    if (!mockUsers[email]) {
      mockUsers[email] = {
        email,
        firstName: email.split('@')[0],
        id: `user-${Date.now()}`,
        lastName: 'Demo',
        phone: '+1234567890',
        role: 0,
        token: `mock-token-${Date.now()}`,
      };
    }
    
    return mockUsers[email].token;
  }

  async getUserByEmail(email: string): Promise<UserInfo> {
    await delay();
    
    if (mockUsers[email]) {
      return mockUsers[email];
    }
    
    // Return a default user
    return mockUsers['admin@admin.com'];
  }

  async signup(userData: any): Promise<UserInfo> {
    await delay();
    
    const newUser: UserInfo = {
      email: userData.email,
      firstName: userData.firstName,
      id: `user-${Date.now()}`,
      lastName: userData.lastName,
      phone: userData.phone,
      role: 0,
      token: `mock-token-${Date.now()}`,
    };
    
    mockUsers[userData.email] = newUser;
    return newUser;
  }

  // Products
  async getProducts(params: {
    searchTerm?: string;
    sort?: string;
    categoryFilter?: string;
    brandFilter?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Product[]> {
    await delay();
    
    let products = [...productsData] as Product[];
    
    // Filter by search term
    if (params.searchTerm) {
      const search = params.searchTerm.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
      );
    }
    
    // Filter by category
    if (params.categoryFilter) {
      const categories = params.categoryFilter.split('-');
      products = products.filter(p => categories.includes(p.category));
    }
    
    // Filter by brand (checking product name for brand keywords)
    if (params.brandFilter) {
      const brands = params.brandFilter.split('-').map(b => b.toLowerCase());
      products = products.filter(p => 
        brands.some(brand => p.name.toLowerCase().includes(brand))
      );
    }
    
    // Sort products
    if (params.sort === '1') {
      // Sort by sales (descending)
      products.sort((a, b) => b.numberOfSales - a.numberOfSales);
    } else if (params.sort === '2') {
      // Sort by price (ascending)
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort === '3') {
      // Sort by price (descending)
      products.sort((a, b) => b.price - a.price);
    } else {
      // Default: Sort by newest
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    // Pagination
    const offset = params.offset || 0;
    const limit = params.limit || 20;
    products = products.slice(offset, offset + limit);
    
    return products;
  }

  async getProductById(id: string): Promise<Product> {
    await delay();
    
    const product = productsData.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product as Product;
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    await delay();
    
    const newProduct = {
      ...product,
      id: `product-${Date.now()}`,
      createdAt: new Date().toISOString(),
      numberOfSales: 0,
      status: 'listed',
    } as Product;
    
    productsData.push(newProduct as any);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay();
    
    const index = productsData.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const updated = { ...productsData[index], ...updates } as Product;
    (productsData as any)[index] = updated;
    return updated;
  }

  async deleteProduct(id: string): Promise<void> {
    await delay();
    
    const index = productsData.findIndex(p => p.id === id);
    if (index !== -1) {
      productsData.splice(index, 1);
    }
  }

  // Categories
  async getCategories(): Promise<typeof categoriesData> {
    await delay();
    return categoriesData;
  }

  async createCategory(category: any): Promise<any> {
    await delay();
    const newCategory = {
      ...category,
      id: `category-${Date.now()}`,
    };
    categoriesData.push(newCategory as any);
    return newCategory;
  }

  async updateCategory(id: string, updates: any): Promise<any> {
    await delay();
    const index = categoriesData.findIndex(c => c.id === id);
    if (index !== -1) {
      (categoriesData as any)[index] = { ...categoriesData[index], ...updates };
      return categoriesData[index];
    }
    throw new Error('Category not found');
  }

  async deleteCategory(id: string): Promise<void> {
    await delay();
    const index = categoriesData.findIndex(c => c.id === id);
    if (index !== -1) {
      categoriesData.splice(index, 1);
    }
  }

  // Brands
  async getBrands(): Promise<typeof brandsData> {
    await delay();
    return brandsData;
  }

  async createBrand(brand: any): Promise<any> {
    await delay();
    const newBrand = {
      ...brand,
      id: `brand-${Date.now()}`,
    };
    brandsData.push(newBrand as any);
    return newBrand;
  }

  async updateBrand(id: string, updates: any): Promise<any> {
    await delay();
    const index = brandsData.findIndex(b => b.id === id);
    if (index !== -1) {
      (brandsData as any)[index] = { ...brandsData[index], ...updates };
      return brandsData[index];
    }
    throw new Error('Brand not found');
  }

  async deleteBrand(id: string): Promise<void> {
    await delay();
    const index = brandsData.findIndex(b => b.id === id);
    if (index !== -1) {
      brandsData.splice(index, 1);
    }
  }

  // Wishlist
  async getUserWishlist(userId: string): Promise<any> {
    await delay();
    
    if (!mockWishlists[userId]) {
      mockWishlists[userId] = [];
    }
    
    return {
      id: `wishlist-${userId}`,
      userId,
      productIds: mockWishlists[userId],
    };
  }

  async addToWishlist(wishlistId: string, productId: string): Promise<any> {
    await delay();
    
    // Extract userId from wishlistId
    const userId = wishlistId.replace('wishlist-', '');
    
    if (!mockWishlists[userId]) {
      mockWishlists[userId] = [];
    }
    
    if (!mockWishlists[userId].includes(productId)) {
      mockWishlists[userId].push(productId);
    }
    
    return {
      id: wishlistId,
      userId,
      productIds: mockWishlists[userId],
    };
  }

  async removeFromWishlist(wishlistId: string, productId: string): Promise<any> {
    await delay();
    
    const userId = wishlistId.replace('wishlist-', '');
    
    if (mockWishlists[userId]) {
      mockWishlists[userId] = mockWishlists[userId].filter(id => id !== productId);
    }
    
    return {
      id: wishlistId,
      userId,
      productIds: mockWishlists[userId] || [],
    };
  }

  // Orders (mock implementation)
  async getOrders(): Promise<any[]> {
    await delay();
    return [];
  }

  async createOrder(order: any): Promise<any> {
    await delay();
    return {
      ...order,
      id: `order-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  }

  // Users management
  async getUsers(): Promise<any[]> {
    await delay();
    return Object.values(mockUsers);
  }

  async updateUser(id: string, updates: any): Promise<UserInfo> {
    await delay();
    
    const user = Object.values(mockUsers).find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updated = { ...user, ...updates };
    mockUsers[user.email] = updated;
    return updated;
  }
}

export const mockApi = new MockAPI();

