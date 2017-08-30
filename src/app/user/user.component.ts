import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/user/user';
import { UserService } from '../user.service'
import { UploadService } from '../shared/user/upload.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, UploadService]
})
export class UserComponent implements OnInit {

  user: User;
  mode: string = "ADD";
  id: string = "";
  filesToUpload: Array<File>;
  url = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private uploadService: UploadService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let id = params["id"];
        this.userService.findById(id).subscribe(
          user => {
            this.user = user;
          }, error => {
            console.log(error);
          });
        this.mode = "EDIT";
        this.id = id;
      }
    });
  }

  onSave() {
    // let user = {
    //   firstName: this.user.firstName,
    //   lastName: this.user.lastName,
    //   phone: this.user.phone,
    //   email: this.user.email,
    //   password: this.user.password
    // }

    if (this.mode === "EDIT") {
      this.userService.updateItem(this.id, this.user).subscribe(
        data => {
          Materialize.toast('update complete.', 1000);
          this.router.navigate(['support', 'user-list']);
          this.upload();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.userService.addItem(this.user).subscribe(
        datas => {
          this.id = datas._id;
          Materialize.toast('save complete.', 1000);
          this.router.navigate(['support', 'user-list']);
          this.upload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  fileChangeEvent(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload() {
    if (this.filesToUpload.length > 0) {
      this.uploadService.makeFileRequest(
        "avatar",
        environment.apiUrl + "/user/profile/" + this.id,
        [], this.filesToUpload).subscribe((res) => {
          this.router.navigate(['support', 'user-list']);
        });
    } else {
      this.router.navigate(['support', 'user-list']);
    }

  }
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.url = event.target["result"];
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onBack() {
    this.router.navigate(['support', 'user-list']);
  }
}