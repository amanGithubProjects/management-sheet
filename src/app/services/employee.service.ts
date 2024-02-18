import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from 'src/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  Api_base_path :string= 'http://localhost:4200/api/'
  constructor(private http : HttpClient) { }

  getAllEmployee(){
    return this.http.get(this.Api_base_path+"employees")
  }

  getDetails(empId : number){
    return this.http.get(`${this.Api_base_path}employees/${empId}`)
  }

  deletEmployee(empId:number){
    return this.http.delete(`${this.Api_base_path}employees/${empId}`)
  }
  addEmployee(empObj: employeeModel){
    return this.http.post(`${this.Api_base_path}employees`,empObj)
  }
  updateEmployee(empObj: employeeModel){
    return this.http.put(`${this.Api_base_path}employees/${empObj.id}`,empObj)
  }
}
