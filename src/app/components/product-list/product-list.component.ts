import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ApiService } from '../../services/api.service';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, PaginationComponent,ProductFiltersComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {


  apiService = inject(ApiService);

  products = this.apiService.paginatedProducts.asReadonly();
  categories = this.apiService.categories.asReadonly();


  ngOnInit(){
    this.apiService.fetchProducts();
    this.apiService.fetchCategories();
  }


}
