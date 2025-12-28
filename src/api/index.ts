import axios from "axios";
import { mockApi } from "./mockApi";

// Use mock API for frontend-only preview
const USE_MOCK_API = true;

const isDevelopment = import.meta.env.MODE === "development";
let baseURL = "http://localhost:5125/api/v1";

if (!isDevelopment) {
  baseURL = "https://backend-project-1321.azurewebsites.net/api/v1";
}

const axiosInstance = axios.create({
  baseURL,
});

// Mock API wrapper to match axios interface
const createMockApiWrapper = () => {
  return {
    get: async (url: string, config?: any) => {
      const params = new URLSearchParams(url.split('?')[1] || '');
      const path = url.split('?')[0];
      
      // Parse query parameters
      const queryParams: any = {};
      params.forEach((value, key) => {
        queryParams[key] = value;
      });
      
      try {
        let data;
        
        // Route matching
        if (path === '/products') {
          data = await mockApi.getProducts({
            searchTerm: queryParams.searchTerm,
            sort: queryParams.sort,
            categoryFilter: queryParams.categoryFilter,
            brandFilter: queryParams.brandFilter,
            limit: parseInt(queryParams.limit) || 20,
            offset: parseInt(queryParams.offset) || 0,
          });
        } else if (path.startsWith('/products/')) {
          const id = path.split('/products/')[1];
          data = await mockApi.getProductById(id);
        } else if (path === '/categories') {
          data = await mockApi.getCategories();
        } else if (path === '/brands') {
          data = await mockApi.getBrands();
        } else if (path.startsWith('/wishlist/user/')) {
          const userId = path.split('/wishlist/user/')[1];
          data = await mockApi.getUserWishlist(userId);
        } else if (path.startsWith('/users/email/')) {
          const email = path.split('/users/email/')[1];
          data = await mockApi.getUserByEmail(email);
        } else if (path === '/users') {
          data = await mockApi.getUsers();
        } else if (path === '/orders') {
          data = await mockApi.getOrders();
        } else {
          throw new Error(`Route not implemented: ${path}`);
        }
        
        return { data, status: 200, statusText: 'OK', headers: {}, config: {} as any };
      } catch (error: any) {
        throw {
          response: {
            data: error.message,
            status: 404,
            statusText: 'Not Found',
          }
        };
      }
    },
    
    post: async (url: string, body?: any, config?: any) => {
      const path = url.split('?')[0];
      
      try {
        let data;
        
        if (path === '/users/signin') {
          data = await mockApi.signin(body.email, body.password);
        } else if (path === '/users/signup') {
          data = await mockApi.signup(body);
        } else if (path === '/products') {
          data = await mockApi.createProduct(body);
        } else if (path === '/categories') {
          data = await mockApi.createCategory(body);
        } else if (path === '/brands') {
          data = await mockApi.createBrand(body);
        } else if (path === '/orders') {
          data = await mockApi.createOrder(body);
        } else {
          throw new Error(`Route not implemented: ${path}`);
        }
        
        return { data, status: 200, statusText: 'OK', headers: {}, config: {} as any };
      } catch (error: any) {
        throw {
          response: {
            data: error.message,
            status: 400,
            statusText: 'Bad Request',
          }
        };
      }
    },
    
    put: async (url: string, body?: any, config?: any) => {
      const path = url.split('?')[0];
      
      try {
        let data;
        
        if (path.startsWith('/wishlist/')) {
          const parts = path.split('/');
          const wishlistId = parts[2];
          const productId = parts[3];
          data = await mockApi.addToWishlist(wishlistId, productId);
        } else if (path.startsWith('/products/')) {
          const id = path.split('/products/')[1];
          data = await mockApi.updateProduct(id, body);
        } else if (path.startsWith('/categories/')) {
          const id = path.split('/categories/')[1];
          data = await mockApi.updateCategory(id, body);
        } else if (path.startsWith('/brands/')) {
          const id = path.split('/brands/')[1];
          data = await mockApi.updateBrand(id, body);
        } else if (path.startsWith('/users/')) {
          const id = path.split('/users/')[1];
          data = await mockApi.updateUser(id, body);
        } else {
          throw new Error(`Route not implemented: ${path}`);
        }
        
        return { data, status: 200, statusText: 'OK', headers: {}, config: {} as any };
      } catch (error: any) {
        throw {
          response: {
            data: error.message,
            status: 400,
            statusText: 'Bad Request',
          }
        };
      }
    },
    
    delete: async (url: string, config?: any) => {
      const path = url.split('?')[0];
      
      try {
        if (path.startsWith('/products/')) {
          const id = path.split('/products/')[1];
          await mockApi.deleteProduct(id);
        } else if (path.startsWith('/categories/')) {
          const id = path.split('/categories/')[1];
          await mockApi.deleteCategory(id);
        } else if (path.startsWith('/brands/')) {
          const id = path.split('/brands/')[1];
          await mockApi.deleteBrand(id);
        } else {
          throw new Error(`Route not implemented: ${path}`);
        }
        
        return { data: null, status: 204, statusText: 'No Content', headers: {}, config: {} as any };
      } catch (error: any) {
        throw {
          response: {
            data: error.message,
            status: 404,
            statusText: 'Not Found',
          }
        };
      }
    },
    
    patch: async (url: string, body?: any, config?: any) => {
      // Use PUT handler for PATCH
      return createMockApiWrapper().put(url, body, config);
    },
  };
};

// Export either mock API or real axios instance
const api = USE_MOCK_API ? createMockApiWrapper() : axiosInstance;

export default api;
