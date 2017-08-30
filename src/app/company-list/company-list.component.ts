import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service'
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService
  ) { }
  companyData = [];
  searchText: string = "";
  numPage: number = 0;
  rowPerPage: number = 5;
  total: number = 0;
  paging = [];
  ngOnInit() {

    //let company:Array<any>=[];
    //if(localStorage.getItem('company')){
    //  this.companyData=JSON.parse(localStorage.getItem('company'));
    //}
    //this.onGetCompany();
    this.onSearch();

  }
  onGetCompany() {
    //Reactive
    this.companyService.loadItem().subscribe(
      datas => {
        this.companyData = datas;
      },
      err => {
        console.log(err);
      });
  }
  onAddbtnClick() {
    this.router.navigate(['support', 'company']);
  }
  onEditbtnClick(id) {
    this.router.navigate(['support', 'company', id]);
  }
  onDelbtnClick(id) {
    //this.companyData.splice(id,1);
    //localStorage.setItem('company',JSON.stringify(this.companyData));
    //var delID=this.companyData[id]._id
    this.companyService.delItem(id).subscribe(
      datas => {
        this.companyData = datas;
        //this.router.navigate(['support', 'company-list']);
        Materialize.toast('Delete data Complete', 3000);
        this.onGetCompany();
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

    this.companyService.SearchData(searchBody).subscribe(
      data => {
        this.companyData = data.rows;
        console.log(this.companyData);
        this.total = data.total;
        this.renderPaging();
      }, error => {
        console.log(error);
      }
    );
  }
  renderPaging() {
    let allPage=Math.ceil(this.total/this.rowPerPage);
    this.paging=[];
    for(let i=0;i<allPage;i++){
      this.paging.push(i+1);
    }
      
  }
  gotoPage(pID){
    this.numPage=pID;
    this.onSearch();
  }
}
