import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Category, Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  categories: Category[] = [];
  products: Product[] | null = null;
  selectedCategory: string | null = null;

  ngOnInit() {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.products = null;
        if (this.selectedCategory) {
          this.loadProductsByCategory(this.selectedCategory);
        }
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryClick(category: Category) {
    this.selectedCategory = category.name;
    this.products = null;
    this.cdr.detectChanges();
    this.loadProductsByCategory(category.name);
  }

  loadProductsByCategory(category: string) {
    // Önce loading state'i göster
    this.products = null;
    this.cdr.detectChanges();
    
    // Ürünleri yükle
    this.productService.getProductsByCategory(category).subscribe(products => {
      // Tüm ürünleri aynı anda ata
      this.products = [...products];
      this.cdr.detectChanges();
      
      // Debug için console'a yazdır
      console.log(`${category} kategorisinde ${products.length} ürün bulundu:`, products);
    });
  }

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }
} 