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

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<any[]>('https://raw.githubusercontent.com/sBohTor/Actividad1.12/master/json1.12/data.json') 
      .subscribe(
        (response) => {
          this.products = response;
        },
        (error) => {
          console.error('Error al obtener los productos:', error);
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
}
