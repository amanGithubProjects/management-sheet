import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { employeeModel } from 'src/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }

  createDb(){
    let employees:employeeModel[] = [
      {
        id: 1,
        department: 'account',
        empName: 'aman',
        mobile: '4564564560',
        gender: 'male',
        joinDate: '2023-01-05',
        email: 'aman@gmail.com',
        salary: 800000,
        password: 123,
        cnfPassword: 123,
        empStatus: true,
      },
      {
        id: 2,
        department: 'account',
        empName: 'lucky',
        mobile: '4564564560',
        gender: 'male',
        joinDate: '2023-01-05',
        email: 'aman@gmail.com',
        salary: 800000,
        password: 123,
        cnfPassword: 123,
        empStatus: true,
      },
      {
        id: 3,
        department: 'account',
        empName: 'champ',
        mobile: '4564564560',
        gender: 'male',
        joinDate: '2023-01-05',
        email: 'aman@gmail.com',
        salary:800000,
        password: 123,
        cnfPassword: 123,
        empStatus: true,
      },
    ]

    return {employees};
  }
}
