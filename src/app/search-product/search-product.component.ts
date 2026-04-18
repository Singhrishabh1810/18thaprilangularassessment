import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit {

  searchName: string = '';
  searchCategory: string = '';
  allProducts: Product[] = [];
  results: Product[] = [];
  searched: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  onSearch(): void {
    this.searched = true;
    this.results = this.allProducts.filter(p => {
      const nameMatch = this.searchName
        ? p.pname.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
      const catMatch = this.searchCategory
        ? p.category.toLowerCase().includes(this.searchCategory.toLowerCase())
        : true;
      return nameMatch && catMatch;
    });
  }
}
