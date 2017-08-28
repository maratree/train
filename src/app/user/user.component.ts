import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }
  userCode: string;
  userName: string;
  userType: string;
  userLavel: string;
  userData = [];
  id: number = 0;
  mode: string = '';
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params["id"];
        this.GetDataByID(id)
        this.id = id;
        this.mode = "EDIT";
      }
    });
    setTimeout(function () {
      Materialize.updateTextFields();
    }, 50);
  }
  GetDataByID(id) {
    //Reactive
    this.userService.loadItemByID(id).subscribe(
      user => {
        this.userCode = user.userCode;
        this.userName = user.userName;
        this.userType = user.userType;
        this.userLavel = user.userLavel;
      },
      err => {
        console.log(err);
      });
  }
  onSave() {
    let user = {
      userCode: this.userCode,
      userName: this.userName,
      userType: this.userType,
      userLavel: this.userLavel
    }
    //let company: Array<any> = [];

    if (this.mode === "EDIT") {
      this.userService.UpdateItem(this.id, user).subscribe(
        users => {
          this.router.navigate(['support', 'user-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      //company.push(comp);
      this.userService.addItem(user).subscribe(
        users => {
          //this.companyData = datas; 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'user-list']);
        },
        err => {
          console.log(err);
        });
    }

  }
  onBack() {
    this.router.navigate(['support', 'user-list']);
  }

}