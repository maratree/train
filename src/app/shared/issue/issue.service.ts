import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class IssueService {
 options: RequestOptions;
  constructor(private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: headers });
   }
//get item from api
  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/issue`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //get item from api
  loadItemByID(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/issue/findByID/${id}`, this.options)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //post item from api
  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/issue`, body, this.options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  //Delete
  delItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/issue/${id}`, this.options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  //put
  UpdateItem(id, body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${environment.apiUrl}/issue/${id}`, body,  this.options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }
  SearchData(body) {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/issue/search`, bodyString, this.options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

}
