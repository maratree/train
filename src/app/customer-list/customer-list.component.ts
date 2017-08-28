import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service'
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [CustomerService]
})
export class CustomerListComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) { }
  customerData = [];
  searchText: string = "";
  numPage: number = 0;
  rowPerPage: number = 5;
  total: number = 0;
  paging = [];
  ngOnInit() {
    
    //this.onGetCustomer();
    this.onSearch();
    
  }
  onGetCustomer() {
    //Reactive
    this.customerService.loadItem().subscribe(
      datas => {
        this.customerData = datas;
      },
      err => {
        console.log(err);
      });
  }
  onAddbtnClick() {
    this.router.navigate(['support', 'customer']);
  }
  onEditbtnClick(id) {
    this.router.navigate(['support', 'customer', id]);
  }
  onDelbtnClick(id) {
    
    this.customerService.delItem(id).subscribe(
      datas => {
        this.customerData = datas;
        
        Materialize.toast('Delete data Complete', 3000);
        this.onGetCustomer();
      },
      err => {
        console.log(err);
      });

  }
  onSearch() {
    let searchBody = {
      searchText: this.searchText,
      numPage: this.numPage,
      rowPerPage: this.rowPerPage
    }
    this.customerService.SearchData(searchBody).subscribe(
      data => {
        this.customerData = data.row;
        this.total = data.total;
        this.renderPaging();
      }, error => {
        console.log(error);
      }
    );
  }
  renderPaging() {
    let allPage = Math.ceil(this.total / this.rowPerPage);
    this.paging = [];
    for (let i = 0; i < allPage; i++) {
      this.paging.push(i + 1);
    }

  }
  gotoPage(pID) {
    this.numPage = pID;
    this.onSearch();
  }
}
