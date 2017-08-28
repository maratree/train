import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  title:string="This is a title";
  show:boolean=false;
  list=["one","two","tree"];
  Active:boolean=true;
  conditionExpression:string="A";
  case1Exp:string="B";
  price:number=1222234;
  currentDate=new Date();
  ngOnInit() {
  }
  onclick(){
    this.title="Click";
    this.show=!this.show;
    this.Active=!this.Active;
  }
}
