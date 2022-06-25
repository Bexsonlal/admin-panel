import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-create-update-employee',
  templateUrl: './create-update-employee.component.html',
  styleUrls: ['./create-update-employee.component.css']
})
export class CreateUpdateEmployeeComponent implements OnInit {

  displayedColumns: string[] = ['employeeId', 'employeeFirstName','employeeLastName','designation','salary','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService,private dialog :MatDialog){
  
  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.api.getEmployee()
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
  editEmployee(row:any){
    this.dialog.open(EmployeeDialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val ==='update'){
        this.getAllEmployees();
      }
    })
  }
  openDialog() {
    this.dialog.open(EmployeeDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val ==='save'){
        this.getAllEmployees();
      }
    })
  }
  deleteEmployee(row:any){
this.api.deleteEmployee(row.employeeId)
.subscribe({
  next:(res)=>{
    alert("Employee Deleted Successfully")
    this.getAllEmployees();
  },
  error:()=>{
    alert("Error while deleting the Employee!!")   
  }
})
  }
  
  
}
