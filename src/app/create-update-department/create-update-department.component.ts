import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-create-update-department',
  templateUrl: './create-update-department.component.html',
  styleUrls: ['./create-update-department.component.css']
})
export class CreateUpdateDepartmentComponent implements OnInit {

  displayedColumns: string[] = ['departmentId','departmentCode','departmentName', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService,private dialog :MatDialog){
  
  }
  ngOnInit(): void {
    this.getAllDepartments();
  }
  getAllDepartments(){
    this.api.getDepartment()
    .subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this .dataSource.sort=this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editDepartment(row:any){
    this.dialog.open(CreateDepartmentComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllDepartments();
      }
    })
  }
  openDialog() {
    this.dialog.open(CreateDepartmentComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllDepartments();
      }
    })
  }
  deleteDepartment(id:number){
this.api.deleteDepartment(id)
.subscribe({
  next:(res)=>{
    alert("Department Deleted Successfully")
    this.getAllDepartments();
  },
  error:()=>{
    alert("Error while deleting the Department!!")   
  }
})
  }
  
  
}
