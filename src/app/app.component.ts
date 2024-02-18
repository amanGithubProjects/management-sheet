import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './services/employee.service';
import { employeeModel } from 'src/Models/employee';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { dbOperation } from 'src/Helpers/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'management-sheet';

  employeeForm: FormGroup = new FormGroup({});

  employeesData : employeeModel[] = [];

  buttonType : string = 'save';

  operation!: dbOperation;

  constructor(private fb : FormBuilder,
     private empServ: EmployeeService,
     private toast: ToastrService ){}

  ngOnInit(){
    this.setForm();
    this.getAllEmployee();
  }


  setForm(){
    this.buttonType = 'save';

    this.operation = dbOperation.create;

    this.employeeForm = this.fb.group({
       id:[0],
       department: ['', Validators.required],
       empName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(21)],
       mobile: ['', Validators.required],
       gender: ['', Validators.required],
       joinDate: ['', Validators.required],
       email: ['', Validators.required],
       salary: ['', Validators.required],
       password: ['', Validators.required],
       cnfPassword: ['', Validators.required],
       empStatus: [false, Validators.requiredTrue],
    })
  }

  onFormSubmit(){
     console.log(this.employeeForm.value);
    //  alert("Employee's details added successfully...")
    if(this.employeeForm.invalid){
        return;
    }

    switch(this.operation){
      case dbOperation.create:
        this.empServ.addEmployee(this.employeeForm.value).subscribe((res)=>{
          this.toast.success("Reacord added successfully!!!");
          this.getAllEmployee();
          this.resetBtn();
        })

      break;

      case dbOperation.update:
        this.empServ.updateEmployee(this.employeeForm.value).subscribe((res)=>{
          this.toast.success("Reacord updated successfully!!!");
          this.getAllEmployee();
          this.resetBtn();
        })

      break;
    }
     
  }

  get frm(){
    return this.employeeForm.controls;
  }

  resetBtn(){
    this.employeeForm.reset();
    this.buttonType = 'Save';
  }

  cancel(){
    this.employeeForm.reset();
    this.buttonType = 'Save';
  }

  getAllEmployee(){
    this.empServ.getAllEmployee().subscribe((result:any)=>{
     this.employeesData = result;
    })
  }

  

  onEdit(empId : number){
    this.buttonType = 'update';
    this.operation = dbOperation.update;
    //  alert(empId)
    let empData = this.employeesData.find((e : employeeModel )=>{e.id == empId });
    if (empData) {
      this.employeeForm.patchValue(empData);
  } else {
      // Handle case where employee with given ID is not found
      console.log("Employee with ID " + empId + " not found.");
  }
  }

  onDelete(empId : number){
    
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sure",
      denyButtonText: `Don't sure`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.empServ.deletEmployee(empId).subscribe((result)=>{
          this.getAllEmployee();
          // this.toast.success("Record deleted successfully")
        })
        Swal.fire("Done!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
}
