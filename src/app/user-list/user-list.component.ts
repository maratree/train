import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
imgUrl = "http://localhost:3000/user/profile/"
  constructor(private router: Router,
    private userService: UserService
  ) { }
   userData = [];
  // searchText: string = "";
  // numPage: number = 0;
  // rowPerPage: number = 5;
  // total: number = 0;
  // paging = [];

  ngOnInit() {
    
    //this.onSearch();
    this.loadData();
  }
  
  onAddbtnClick() {
    this.router.navigate(['support', 'user']);
  }
  onEditbtnClick(id) {
    this.router.navigate(['support', 'user', id]);
  }
  onDelbtnClick(id){
    this.userService.deleteItem(id).subscribe((datas)=>{
      this.loadData();
    });
  }

  loadData(){
    this.userService.loadItem().subscribe((datas)=>{
      this.userData = datas;
    });
  }

  // onGetUser() {
  //   //Reactive
  //   this.userService.loadItem().subscribe(
  //     datas => {
  //       this.userData = datas;
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

  // onDelbtnClick(id) {
  //   this.userService.delItem(id).subscribe(datas => {
  //       this.userData = datas;
  //       Materialize.toast('Delete data Complete', 3000);
  //       this.onGetUser();
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }
  // onSearch() {
  //   let searchBody = {
  //     searchText: this.searchText,
  //     numPage: this.numPage,
  //     rowPerPage: this.rowPerPage
  //   }
  //   this.userService.SearchData(searchBody).subscribe(
  //     data => {
  //       this.userData = data.row;
  //       this.total = data.total;
  //       this.renderPaging();
  //     }, error => {
  //       console.log(error);
  //     }
  //   );
  // }
  // renderPaging() {
  //   let allPage = Math.ceil(this.total / this.rowPerPage);
  //   this.paging = [];
  //   for (let i = 0; i < allPage; i++) {
  //     this.paging.push(i + 1);
  //   }

  // }
  // gotoPage(pID) {
  //   this.numPage = pID;
  //   this.onSearch();
  // }
}
