import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee/employee.model";
import { NgForm } from "@angular/forms";
import { DataService } from "../data.service";
import { Observable } from 'rxjs';

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-edit",
  templateUrl: "./employee-edit.component.html",
  styleUrls: ["./employee-edit.component.css"]
})
export class EmployeeEditComponent implements OnInit {
  qualification: string[];
  errorMessage: string;
  languages: string[];
  experience: string[];
  ID: number;
  pageTitle: string;

  constructor(
    private dataService: DataService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  employee: Employee = {
    id:null,
    firstName: null,
    lastName: null,
    email: null,
    number: null,
    address: null,
    username: null,
    password: null,
    gender: null,
    experience: null,
    qualification: null,
    languages: []
  };

  ngOnInit() {
   // this.ID = parseInt(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.ID = +params.get('id');
        this.getEmployee(this.ID);
      }
    );
    console.log(this.ID);
    this.qualification = ["CE", "IT", "EC"];
    this.experience = [
      "Fresher",
      "Above 1 years",
      "Above 3 years",
      "Above 5 years"
    ];
    this.languages = ["C", "Java", "CSharp", "PHP", "Python"];
  }

  getEmployee(id: number): void {
    this.dataService.getEmployeesbyId(id).subscribe(
      (employee: Employee) => this.employeeTitles(employee),
      (error: any) => (this.errorMessage = <any>error)
    );
  }
  saveEmployee(): void {
    if (this.ID == 0) {
      this.dataService.addEmployee(this.employee).subscribe(
        () =>
          this.onSaveComplete(`The new ${this.employee.firstName} was saved`),
        (error: any) => (this.errorMessage = <any>error)
      );
    } else {
      this.dataService.updateEmployee(this.employee).subscribe(
        () =>
          this.onSaveComplete(
            `The updated ${this.employee.firstName} was saved`
          ),
        (error: any) => (this.errorMessage = <any>error)
      );
    }
  }
  employeeTitles(employee: Employee): void {
    this.employee = employee;

    if (!this.employee) {
      this.pageTitle = "No employee found";
    } else {
      if (this.ID === 0) {
        this.pageTitle = "Add Employee";

      } else {
        this.pageTitle = `Edit Employee: ${this.employee.firstName} ${this.employee.lastName}`;
      }
    }
  }
  cancelUpdation(){
    if (confirm(`Are you sure, you don't want to Update the employee: ${this.employee.firstName} ${this.employee.lastName}?`))
    {
      this.route.navigateByUrl("/employees");
    }
  }
  onSaveComplete(message?: string): void {
    if (message) {
      console.log(message);
      if(this.ID == 0){
        alert(`Successfully Added Employee: ${this.employee.firstName} ${this.employee.lastName}`);
      }
      else{
        alert(`Successfully Updated Employee: ${this.employee.firstName} ${this.employee.lastName}`);
      }

    }
    this.route.navigateByUrl("/employees");
  }
}
