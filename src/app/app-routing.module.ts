import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'employees', component:EmployeeListComponent},
      {path: 'employees/:id', component:EmployeeEditComponent},
     // {path: 'employees/add', component:EmployeeComponent },
      {path: '', redirectTo: 'employees', pathMatch: 'full'},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
