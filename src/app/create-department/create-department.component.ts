import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import * as apiServices from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
departmentForm !: FormGroup;
actionBtn : string="Save"
  constructor(private formBuilder:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
        private api :apiServices.ApiService,
    private dialogRef :MatDialogRef<CreateDepartmentComponent>) { 

  }

  ngOnInit(): void {
    this.departmentForm=this.formBuilder.group({
      departmentId:[''],
  departmentName : ['',Validators.required],
  departmentCode : ['',Validators.required]
    })
    if(this.editData){
      this.actionBtn="Update";
      //Do we need to update this with Patch Value ? check ?
      this.departmentForm.controls['departmentId'].setValue(this.editData.departmentId);
      this.departmentForm.controls['departmentName'].setValue(this.editData.departmentName);
      this.departmentForm.controls['departmentCode'].setValue(this.editData.departmentCode);
    }
  }
  addDepartment(){
    if(!this.editData){
      if(this.departmentForm.valid) {
      
        //remove id field for create process
        this.departmentForm.removeControl('departmentId');
        this.api.postDepartment(this.departmentForm.value)
      .subscribe({
        next:(res)=>{
          alert("Department added Successfully");
        this.api.postDepartment(this.departmentForm.value)
        this.departmentForm.reset();
        this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error While adding the Department")
        }
      })
      }
    }else{
      this.updateDepartment()
    }
  }
  updateDepartment(){
  
  this.api.postDepartment(this.departmentForm.value)
  .subscribe({
  next:(res)=>{
    alert("Department updated successfully");
    this.departmentForm.reset();
    this.dialogRef.close('update')
  },
  error:()=>{
    alert("Error while updating the record!");
  }
})
}
}
