import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from './productservice';
import {Product} from './product';

@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
  styleUrls:["index.component.scss"]
})
export class IndexComponent implements OnInit, OnDestroy {
  products: Product[];
	
	responsiveOptions;
  isCollapsed = true;

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
	constructor(private productService: ProductService) { 
		this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
	}

	ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
		this.productService.getProductsSmall().then(products => {
			this.products = products;
		});
    }
  

}
