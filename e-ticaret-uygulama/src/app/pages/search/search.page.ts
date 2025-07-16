import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  searchQuery = '';
  searchResults: Product[] = [];
  isLoading = false;
  hasSearched = false;
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Arama sorgusu değiştiğinde 300ms bekleyip arama yap
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.isLoading = true;
        return this.productService.searchProducts(query);
      })
    ).subscribe(results => {
      this.searchResults = results;
      this.isLoading = false;
      this.hasSearched = true;
    });
  }

  onSearchChange(event: any) {
    const query = event.detail.value;
    this.searchQuery = query;
    
    if (query.trim().length === 0) {
      this.searchResults = [];
      this.hasSearched = false;
      return;
    }
    
    this.searchSubject.next(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }
} 