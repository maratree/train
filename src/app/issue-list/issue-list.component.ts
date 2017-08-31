import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from '../shared/issue/issue.service'

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  providers: [IssueService]
})
export class IssueListComponent implements OnInit {

  constructor(
    private router: Router,
    private issueService: IssueService
  ) { }
  issueData = [];
  searchText: string = "";
  numPage: number = 0;
  rowPerPage: number = 5;
  total: number = 0;
  paging = [];
  
  ngOnInit() {
    //this.onSearch();
    this.onGetIssue();
  }
  onGetIssue() {
    //Reactive
    this.issueService.loadItem().subscribe(
      datas => {
        this.issueData = datas;
      },
      err => {
        console.log(err);
      });
  }
  onAddbtnClick() {
    this.router.navigate(['support', 'issue']);
  }
  onEditbtnClick(id) {
    this.router.navigate(['support', 'issue', id]);
  }
  onActtachbtnClick(id){{
    this.router.navigate(['support', 'issue-attach', id]);
  }}
  onDelbtnClick(id) {

    this.issueService.delItem(id).subscribe(
      datas => {
        this.issueData = datas;
        //this.router.navigate(['support', 'company-list']);
        Materialize.toast('Delete data Complete', 3000);
        this.onGetIssue();
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

    this.issueService.SearchData(searchBody).subscribe(
      data => {
        this.issueData = data.rows;
        console.log(this.issueData);
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
