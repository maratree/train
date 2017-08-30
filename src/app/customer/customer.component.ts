import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service'
import { CompanyService } from '../company.service'
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService, CompanyService]

})
export class CustomerComponent implements OnInit {
  cusCode: string;
  cusName: string;
  customerData = [];
  companyData = [];
  compCode: string = "";
  id: number = 0;
  mode: string = '';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService) { }

  ngOnInit() {

    this.onGetCompany();
    this.activatedRoute.params.subscribe(params => {
      this.companyService.loadItem().subscribe((data) => {
        this.companyData = data;
        setTimeout(() => {
          $('select').material_select();
        },100);

      });
      if (params['id']) {
        let id = params["id"];
        this.GetDataByID(id)
        this.id = id;
        this.mode = "EDIT";
      }
    });

    setTimeout(function () {
      Materialize.updateTextFields();
    }, 100);

  }
  GetDataByID(id) {
    //Reactive
    this.customerService.loadItemByID(id).subscribe(
      customer => {
        this.cusCode = customer.cusCode;
        this.cusName = customer.cusName;
        this.compCode = customer.compCode;
      },
      err => {
        console.log(err);
      });
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
  onSave() {
    let cus = {
      cusCode: this.cusCode,
      cusName: this.cusName,
      compCode: this.compCode
    }
    //let customer: Array<any> = [];

    if (this.mode === "EDIT") {
      this.customerService.UpdateItem(this.id, cus).subscribe(
        customer => {
          this.router.navigate(['support', 'customer-list']);
          Materialize.toast("Update Complete", 3000);
        },
        err => {
          console.log(err);
        });
    }
    else {
      //customer.push(cus);
      this.customerService.addItem(cus).subscribe(
        customer => {
          //this.customerData = datas; 
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'customer-list']);
        },
        err => {
          console.log(err);
        });


    }
    //localStorage.setItem('company',JSON.stringify(company));
  }
  onBack() {
    this.router.navigate(['support', 'customer-list']);
  }
}
