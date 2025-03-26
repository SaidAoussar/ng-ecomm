import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.type';
import { finalize, Observable } from 'rxjs';
import { Category } from '../models/category.type';
import {ProductFilter  } from '../models/product-filter.type';
import { response } from 'express';


type PaginatedResponse<T> = {
  data: T[];
  items: number,
  pages: number
}


//const API_URL = "https://ng-json-api-production.up.railway.app";
const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  http = inject(HttpClient);
  paginatedProducts = signal<Product[]>([])
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  totalPages = signal<number>(0);
  totalItems = signal<number>(0);
  categories = signal<Category[]>([]);
  activeFilter = signal<ProductFilter>({});

  constructor() { }

  fetchProducts(page: number = 1, limit: number = 6){
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams()
        .set('_page', page.toString())
        .set('_per_page', limit.toString());

    //add filter parameters
    const filter = this.activeFilter();


    if(filter.category){
      params = params.set("category", filter.category);
    }

    if(filter.rating){
      const rating = Math.floor(filter.rating)
      params = params.set("rating_gte", rating)
      params = params.set("rating_lt", rating + 1);
    }


    if(filter.minPrice){
      params = params.set("price_gte", filter.minPrice);
    }

    if(filter.maxPrice){
      params = params.set("price_lte", filter.maxPrice)
    }

    return this.http.get<PaginatedResponse<Product>>(`${API_URL}/products`,
      {params}
    )
    .subscribe({
      next: (res) => {
        this.paginatedProducts.set(res.data);
        this.totalItems.set(res.items);
        this.totalPages.set(res.pages);
      },
      error: (err) => {
        this.error.set(err.message)
      }
    })
  }


  setFilter(filter: ProductFilter){
    this.activeFilter.set(filter);
  }

  fetchCategories(){
    return this.http.get<Category[]>(`${API_URL}/categories`)
    .subscribe({
      next: (res) => {
        this.categories.set(res);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }


  getProductById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/products/${id}`);
  }


}
