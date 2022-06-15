import { Component, OnInit,ViewChild } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  providers: [DatePipe],
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['attendanceName', 'employeeID', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  

  constructor(private dialog : MatDialog, private api : ApiService, public datePipe: DatePipe){

  }
  
  ngOnInit(): void {
    this.getAllAttendance();
  }

 
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllAttendance(){
    this.api.getAttendance()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while Fetching")
      }
    })
  }
  checkin(){
    
    let currentDateTime =this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    alert(currentDateTime)
    

  }
  checkout(){
    let currentDateTime =this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    alert(currentDateTime)
  }



  
}

