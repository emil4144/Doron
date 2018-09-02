import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Router} from '@angular/router'
import {Observable} from 'rxjs'
import {map, catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http:HttpClient, private router:Router) { }

  

  GetData():Observable<any>{
  	var Murl=this.router.url
  	console.log(Murl)
  	 return this.http.get("getdata"+Murl).pipe(
    
    )
  }





  Filter(data):Observable<any>{

    return this.http.post("getdata", data).pipe(
     catchError((err:Response)=>{throw err})
    )

  }
}
