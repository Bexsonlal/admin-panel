import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
      employeeId : ['',Validators.required],
      employeeFirstName : ['',Validators.required],
      employeeLastName : ['',Validators.required],
      designation : ['',Validators.required],
      salary : ['',Validators.required]
    })
    if(this.editData){
      this.actionBtn="Update";
      this.EmployeeForm.controls['EmployeeId'].setValue(this.editData.EmployeeId);
      this.EmployeeForm.controls['FirstName'].setValue(this.editData.EmployeeFirstName);
      this.EmployeeForm.controls['LastName'].setValue(this.editData.EmployeeLastName);
      this.EmployeeForm.controls['Designation'].setValue(this.editData.Designation)
      this.EmployeeForm.controls['Salary'].setValue(this.editData.Salary);
    }
  }
  
  addEmployee(){
    if(!this.editData){
      if(this.EmployeeForm.valid) {
      
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
  
  this.api.putEmployee(this.EmployeeForm.value,this.editData.id)
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
