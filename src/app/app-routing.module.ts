import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CreateUpdateEmployeeComponent } from './create-update-employee/create-update-employee.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { CreateUpdateDepartmentComponent } from './create-update-department/create-update-department.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'create-update-employee', component: CreateUpdateEmployeeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'create-department', component: CreateDepartmentComponent },
  { path: 'create-update-department', component:CreateUpdateDepartmentComponent},
  { path: 'mark-attendance', component:MarkAttendanceComponent },
  { path: 'login', component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
