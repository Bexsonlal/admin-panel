import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService
{

  constructor(private http : HttpClient) { }
  postDepartment(data: any):Observable<any>{
    return this.http.post<any>("https://localhost:5001/api/Department/SaveDepartments",data);
  }
  getDepartment():Observable<any>{
    return this.http.get<any>("https://localhost:5001/api/Department/GetAllDepartments");
  }
  putDepartment(data:any,id:number):Observable<any>{
    return this.http.put<any>("https://localhost:5001/api/Department/GetDepartmentById/id"+id,data);
  }
  deleteDepartment(id: number): Observable<any> {
    
    return this.http.delete<any>("https://localhost:5001/api/Department/DeleteDepartment"+id);
  }



  postEmployee(data: any):Observable<any>{
    return this.http.post<any>("https://localhost:5001/apiEmployee/SaveEmployees",data);
  }
  getEmployee():Observable<any>{
    return this.http.get<any>("https://localhost:5001/apiEmployee/GetAllEmployees");
  }
  putEmployee(data:any,id:number):Observable<any>{
    return this.http.put<any>("https://localhost:5001/apiEmployee/GetEmployeesById/id"+id,data);
  }
  
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>("https://localhost:5001/apiEmployee/DeleteEmployee"+id);
  }




  postAttendance(data : any){
    return this.http.post<any>("http://localhost:3000/post/",data);
  }
  getAttendance(){
      return this.http.get<any>("http://localhost:3000/post/");
    }
}