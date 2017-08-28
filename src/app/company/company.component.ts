import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) { }
  compCode: string;
  compName: string;
  companyData = [];
  id: number = 0;
  mode: string = '';
  ngOnInit() {
    //url path have parameter
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
    this.companyService.loadItemByID(id).subscribe(
      company => {
        this.compCode = company.compCode;
        this.compName = company.compName;
      },
      err => {
        console.log(err);
      });
  }

  onSave() {
    let comp = {
      compCode: this.compCode,
      compName: this.compName
    }
    //let company: Array<any> = [];

    if (this.mode === "EDIT") {
      this.companyService.UpdateItem(this.id, comp).subscribe(
        company => {
          this.router.navigate(['support', 'company-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      //company.push(comp);
      this.companyService.addItem(comp).subscribe(
        company => {
          //this.companyData = datas; 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'company-list']);
        },
        err => {
          console.log(err);
        });


    }

    //localStorage.setItem('company',JSON.stringify(company));

  }
  onBack() {
    this.router.navigate(['support', 'company-list']);
  }
}
