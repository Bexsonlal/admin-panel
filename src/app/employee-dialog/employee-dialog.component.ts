import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  EmployeeForm !: FormGroup;
  actionBtn : string="Save" 
 
  
  constructor(private formBuilder:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
        private api :ApiService,
    private dialogRef :MatDialogRef<EmployeeDialogComponent>) { 

  }

  ngOnInit(): void {
    this.EmployeeForm=this.formBuilder.group({
      employeeId : [''],
      employeeFirstName : ['',Validators.required],
      employeeLastName : ['',Validators.required],    
     // department : ['',Validators.required],
      designation : ['',Validators.required],
      salary : ['',Validators.required]
    })


    if(this.editData){
      this.actionBtn="Update";
      //Do we need to update this with Patch Value ? check ?
      this.EmployeeForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.EmployeeForm.controls['employeeFirstName'].setValue(this.editData.employeeFirstName);
      this.EmployeeForm.controls['employeeLastName'].setValue(this.editData.employeeLastName);
      this.EmployeeForm.controls['designation'].setValue(this.editData.designation)
      this.EmployeeForm.controls['salary'].setValue(this.editData.salary);
    }
  } 
  
  addEmployee(){
    if(!this.editData){
      if(this.EmployeeForm.valid) {
        //remove id field for create process
        this.EmployeeForm.removeControl('employeeId');
        this.api.postEmployee(this.EmployeeForm.value)
      .subscribe({
        next:(res)=>{
          alert("Employee added Successfully");
        this.api.postEmployee(this.EmployeeForm.value)
        this.EmployeeForm.reset();
        this.dialogRef.close('save');
        },
        error:()=>{
    alert("Error While adding the Employee")
        }
      })
      }
    }else{
      this.updateEmployee()
    }
  }
  updateEmployee(){
  
  this.api.postEmployee(this.EmployeeForm.value)
.subscribe({
  next:(res)=>{
    alert("Employee updated successfully");
    this.EmployeeForm.reset();
    this.dialogRef.close('update')
  },
  error:()=>{
    alert("Error while updating the record!");
  }
})
}

}
