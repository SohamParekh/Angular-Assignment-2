import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee/employee.model';
export class EmployeeDetails implements InMemoryDbService {

  createDb() {
    const employees: Employee[] = [
      {
        'id': 1,
        'firstName': 'soham',
        'lastName': 'parekh',
        'email': 'sp5@gmail.com',
        'number':987643210,
        'address':'asdasd',
        'username':'asas',
        'password':'asa',
        'gender':'male',
        'qualification': 'CE',
        'experience': 'Fresher',
        'languages': ['Java','CSharp']
      },
      {
        'id': 2,
        'firstName': 'S',
        'lastName': 'P',
        'email': 'sp5@gmail.com',
        'number':9874563210,
        'address':'asdasd',
        'username':'asas',
        'password':'asa',
        'gender':'female',
        'qualification': 'IT',
        'experience': 'Above 3 years',
        'languages': ['C','PHP']
      },
      {
        'id': 3,
        'firstName': 'S',
        'lastName': 'P',
        'email': 'sp5@gmail.com',
        'number':9874563210,
        'address':'asdasd',
        'username':'asas',
        'password':'asa',
        'gender':'male',
        'qualification': 'EC',
        'experience': 'Above 3 years',
        'languages': ['Python','C']
      }
    ];
    return { employees };
  }
}
