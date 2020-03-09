import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  pageTitle = 'Employee List'
  employees: Employee[];
  constructor(private dataService: DataService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      }
    );

  }
  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure, you want to delete the employee: ${employee.firstName} ${employee.lastName}?`))
    {
      this.dataService.deleteEmployee(employee.id)
        .subscribe(
          () => this.getEmployeedata()
        );
    }
  }

  getEmployeedata(){
    this.dataService.getEmployees().subscribe(
      data => this.employees = data
    );
  }

}
