export interface User {
    id?: number;
    name: string;
    email: string;
    age: number;
    city: string;
  }
  
  export interface Product {
    id?: number;
    name: string;
    price: number;
    stock: number;
    category: string;
  }
  
  export interface Order {
    id?: number;
    userId: number;
    total: number;
    status: string;
    orderDate: string;
  }