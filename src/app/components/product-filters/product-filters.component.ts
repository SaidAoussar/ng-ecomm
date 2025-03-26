import { Component, Input, inject, signal } from '@angular/core';
import { Category } from '../../models/category.type';
import { ApiService } from '../../services/api.service';
import { ProductFilter } from '../../models/product-filter.type';

@Component({
  selector: 'app-product-filters',
  imports: [],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent {
  @Input() categories!: Category[];
  apiService = inject(ApiService);


  filter = signal<ProductFilter>({});

  // Track whether the filter has been applied
  isFilterApplied = signal(false);


  applyFilter(): void{
    console.log(this.filter());
    this.isFilterApplied.set(true);
    this.apiService.setFilter(this.filter());
    this.apiService.fetchProducts(1);// reset to first page when filter change
  }


  updateFilter(key : keyof ProductFilter, event: Event): void{
    const value = (event.target as HTMLSelectElement).value;

    this.filter.update((current) => ({
      ...current,
      [key] : value === "" ? undefined : value,
    }))
  }


  clearFilter(){
    this.filter.set({});
    this.isFilterApplied.set(false);
    this.apiService.setFilter({});
    this.apiService.fetchProducts(1);
  }


}
