import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }


  //get item from api
  loadItem(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/company`)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
//get item from api
  loadItemByID(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/company/findByID/${id}`)
      .map((res: Response) => {
        return   res.json();
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  //post item from api
  addItem(body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/company`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

//Delete
  delItem(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/company/${id}`) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }

  //put
  UpdateItem(id,body): Observable<any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${environment.apiUrl}/company/${id}`, body, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }
 SearchData(body){
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(`${environment.apiUrl}/company/search`, bodyString, options) // ...using post request
      .map((res: Response) => {
        return res.json()
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any 
  }  
}
