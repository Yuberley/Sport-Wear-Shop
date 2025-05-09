export interface Sale {  
    id: string;  
    date: string;  
    customer: {  
      id: string;  
      name: string;  
      email: string;  
    };  
    products: {  
      id: string;  
      name: string;  
      price: string;  
      quantity: number;  
    }[];  
    total: string;  
    paymentMethod: string;  
    status: 'completed' | 'pending' | 'canceled';  
  }  
    
  export interface SalesReport {  
    sales: Sale[];  
    totalAmount: string;  
    averageOrderValue: string;  
    totalOrders: number;  
  }