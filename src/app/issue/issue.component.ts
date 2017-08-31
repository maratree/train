import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CompanyService } from '../company.service';
import { UserService } from '../user.service';
import { UploadService } from '../shared/issue/upload.service';
import { IssueService } from '../shared/issue/issue.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  providers: [CustomerService, CompanyService, IssueService, UserService, UploadService]
})
export class IssueComponent implements OnInit {
  compCode: string;
  cusCode: string;
  issue: string;
  description: string;
  date: string;
  issueNo: string;
  status: string;
  userCode: string;
  customerData = [];
  companyData = [];
  userData = [];
  id: number = 0;
  mode: string = '';
  test: string;
  filesToUpload: Array<File>;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private issueService: IssueService,
    private userService: UserService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {


    this.activatedRoute.params.subscribe(params => {
      this.onGetCompany();
      this.onGetCustomer();
      this.onGetUser();
      setTimeout(() => {
        $('select').material_select();
      }, 100);

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


    // $('.datepicker').pickadate({
    //   selectMonths: true, // Creates a dropdown to control month
    //   selectYears: 15, // Creates a dropdown of 15 years to control year,
    //   today: 'Today',
    //   clear: 'Clear',
    //   close: 'Ok',
    //   closeOnSelect: false // Close upon selecting a date,
    // });
  }
  GetDataByID(id) {
    //Reactive
    this.issueService.loadItemByID(id).subscribe(
      issueD => {
        this.compCode = issueD.compCode;
        this.cusCode = issueD.cusCode;
        this.issue = issueD.issue;
        this.description = issueD.description;
        this.date = issueD.date;
        this.issueNo = issueD.issueNo;
        this.status = issueD.status;
        this.userCode = issueD.userCode;
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
  onGetUser() {
    //Reactive
    this.userService.loadItem().subscribe(
      datas => {

        this.userData = datas;
        console.log(this.userData);
      },
      err => {
        console.log(err);
      });
  }
  onSave() {
    let issue = {
      compCode: this.compCode,
      cusCode: this.cusCode,
      issue: this.issue,
      description: this.description,
      date: this.date,
      issueNo: this.issueNo,
      status: this.status,
      userCode: this.userCode
    }

    if (this.mode === "EDIT") {
      this.issueService.UpdateItem(this.id, issue).subscribe(
        issue => {
          this.router.navigate(['support', 'issue-list']);
          Materialize.toast("Update Complete", 3000);
          this.upload();
        },
        err => {
          console.log(err);
        });
    }
    else {

      this.issueService.addItem(issue).subscribe(
        issue => {
          Materialize.toast('Add Item Complete', 3000);
          this.router.navigate(['support', 'issue-list']);
          this.upload();
        },
        err => {
          console.log(err);
        });


    }
  }
  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload() {
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(
        "avatar",
        environment.apiUrl + "/issue/profile/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
          this.router.navigate(['support', 'issue-list']);
        });
    } else {
      this.router.navigate(['support', 'issue-list']);
    }

  }
  onBack() {
    this.router.navigate(['support', 'issue-list']);
  }
}
