import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  products: any[] = [];
  filtro: string = '';
  selectedSortOption: string = 'price';
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<any[]>('https://raw.githubusercontent.com/sBohTor/Actividad1.12/master/json1.12/data.json')
      .subscribe(
        (response) => {
          this.products = response;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Error al cargar los productos. Inténtalo de nuevo.';
          this.loading = false;
        }
      );
  }

  get filteredProducts() {
    if (!this.filtro) {
      return this.products;
    }
    return this.products.filter(item =>
      item.name.toLowerCase().includes(this.filtro.toLowerCase()) ||
      item.category.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  get sortedProducts() {
    return this.filteredProducts.sort((a, b) => {
      if (this.selectedSortOption === 'price') {
        return a.price - b.price;
      } else if (this.selectedSortOption === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }
}
