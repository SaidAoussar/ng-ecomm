import { Component, computed, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  apiService = inject(ApiService);
  totalPages = this.apiService.totalPages.asReadonly();
  totalItems = this.apiService.totalItems.asReadonly();


  currentPage = 1;

  pages = computed(() => {
    return Array.from({length: this.totalPages()}, (_,i) => i+1)
  })


  onPageChange(page: number){
    this.currentPage = page;
    this.apiService.fetchProducts(page);
  }
}
