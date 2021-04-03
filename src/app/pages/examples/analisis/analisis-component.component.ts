import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService2 } from './productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

interface City {
    name: string,
    code: string
}

@Component({
  selector: 'app-analisis-component',
  templateUrl: './analisis-component.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
  :host ::ng-deep .p-dialog .p-dialog-header {
    border-bottom: 1px solid #e9ecef;
    background: #003366;
    color: white;
    padding: 1rem;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
}
:host ::ng-deep .pi-times:before {
    color: white;
}



:host ::ng-deep .p-toast .p-toast-message .p-toast-message-content .pi-times:before{
    padding: 1rem;
    background-color: #d4edda;
    border: solid #8A427A;
    border-width: 0 0 0 6px;
    color: black;
    border-width: 0;
}
`],
  styleUrls: ['./analisis-component.component.scss']
})
export class AnalisisComponentComponent implements OnInit {

  productDialog: boolean;
  isCollapsed = true;
  products: Product[];

  product: Product;

  selectedProducts: Product[];

  submitted: boolean;

  cities: City[];
  selectedCity1: City;

  constructor(private primengConfig: PrimeNGConfig,private productService: ProductService2, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.cities = [
        {name: 'Orina', code: 'NY'},
        {name: 'Sangre', code: 'RM'},
        {name: 'Electrocardiograma', code: 'LDN'},
        {name: 'Rayos X', code: 'IST'},
        {name: 'Covid-19', code: 'PRS'}
    ];
    this.primengConfig.ripple = true;
      this.productService.getProducts().then(data => this.products = data);
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => !this.selectedProducts.includes(val));
              this.selectedProducts = null;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          }
      });
  }

  editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.id !== product.id);
              this.product = {};
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }
  
  saveProduct() {
      this.submitted = true;

      if (this.product.name.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;                
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          }
          else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
          }

          this.products =[...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( var i = 0; i < 5; i++ ) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

}
