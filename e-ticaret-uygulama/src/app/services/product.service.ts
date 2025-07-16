import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'En son iPhone modeli, A17 Pro çip ile güçlendirilmiş',
      price: 89999,
      originalPrice: 99999,
      image: 'https://picsum.photos/300/300?random=1',
      category: 'Electronics',
      rating: 4.8,
      reviews: 1250,
      inStock: true,
      discount: 10,
      tags: ['Apple', 'Smartphone', '5G'],
      specifications: {
        'Storage': '256GB',
        'Color': 'Titanium',
        'Screen': '6.1 inch'
      }
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      description: 'Samsung\'un en yeni flagship telefonu',
      price: 79999,
      image: 'https://picsum.photos/300/300?random=2',
      category: 'Electronics',
      rating: 4.6,
      reviews: 890,
      inStock: true,
      tags: ['Samsung', 'Android', '5G']
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      description: 'Apple M3 çip ile güçlendirilmiş ultra hafif laptop',
      price: 129999,
      image: 'https://picsum.photos/300/300?random=3',
      category: 'Electronics',
      rating: 4.9,
      reviews: 567,
      inStock: true,
      tags: ['Apple', 'Laptop', 'M3']
    },
    {
      id: 4,
      name: 'Nike Air Max 270',
      description: 'Rahat ve şık spor ayakkabı',
      price: 1299,
      originalPrice: 1599,
      image: 'https://picsum.photos/300/300?random=4',
      category: 'Fashion',
      rating: 4.5,
      reviews: 234,
      inStock: true,
      discount: 19,
      tags: ['Nike', 'Spor', 'Ayakkabı']
    },
    {
      id: 5,
      name: 'Adidas Ultraboost 22',
      description: 'Koşu için özel tasarlanmış ayakkabı',
      price: 1899,
      image: 'https://picsum.photos/300/300?random=5',
      category: 'Fashion',
      rating: 4.7,
      reviews: 189,
      inStock: true,
      tags: ['Adidas', 'Koşu', 'Ultraboost']
    },
    {
      id: 6,
      name: 'Sony WH-1000XM5',
      description: 'Gürültü engelleyici kablosuz kulaklık',
      price: 8999,
      originalPrice: 10999,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'Electronics',
      rating: 4.8,
      reviews: 456,
      inStock: true,
      discount: 18,
      tags: ['Sony', 'Kulaklık', 'Bluetooth']
    }
  ];

  private categories: Category[] = [
    { id: 1, name: 'Electronics', icon: 'phone-portrait', color: '#3880ff' },
    { id: 2, name: 'Fashion', icon: 'shirt', color: '#eb445a' },
    { id: 3, name: 'Home', icon: 'home', color: '#2dd36f' },
    { id: 4, name: 'Sports', icon: 'fitness', color: '#ffc409' },
    { id: 5, name: 'Books', icon: 'library', color: '#92949c' }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => p.category === category);
    console.log(`ProductService: ${category} kategorisinde ${filteredProducts.length} ürün filtrelendi:`, filteredProducts);
    
    // Ürünlerin hepsinin aynı anda gelmesi için Promise kullan
    return new Observable(observer => {
      setTimeout(() => {
        observer.next([...filteredProducts]);
        observer.complete();
      }, 100); // 100ms gecikme ile tüm ürünler aynı anda gelir
    });
  }

  searchProducts(query: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filteredProducts);
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.discount && p.discount > 0);
    return of(featured);
  }
} 