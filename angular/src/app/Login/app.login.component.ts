import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeedataService } from '../app.service';
import { EmpDataService } from '../app.model';


@Component({
    selector: 'login',
    templateUrl: '/app.login.component.html',
    providers: [EmployeedataService]


})

export class LoginComponent implements OnInit {
    private employees: any = {};
    public errorMsg: any = [];

    constructor(private router: Router, private _service: EmployeedataService, private empDataSr: EmpDataService) { }

    ngOnInit() {

    }



    loginSubmit(value: any) {
        let screen = '';
        this._service.getEmployees(value)
            .subscribe(resEmployeeData => {
                // for (let item of resEmployeeData) {
                //     if (item.username === value.username && item.password === value.password) {
                //this.employees = item;
                localStorage.setItem("app_data", JSON.stringify(value));
                this.empDataSr.setEmpInfo(resEmployeeData.body);
               if (resEmployeeData.body.email) {
                     this.empDataSr.loggedIn = true;
                    switch (resEmployeeData.body.userRole) {
                        case 0: {
                            screen = 'leave'
                            this.empDataSr.isAdmin = false;
                            this.router.navigate([screen]);
                            break;
                        }
                        case 1: {
                            screen = 'admin'
                            this.empDataSr.isAdmin = true;
                            this.router.navigate([screen]);
                            break;
                        }
                        case 2: {
                            screen = 'admin'
                            this.empDataSr.isAdmin = true;
                            this.router.navigate([screen]);
                            break;
                        }
                         
                    }
                        
                } else {
                    this.errorMsg = 'Username or password is incorrect';

                }


                // }
                // if (item.username != value.username && item.password != value.password) {

                //     this.errorMsg = 'Username or password is incorrect';
                // }
                // else {
                //     this.router.navigate([screen]);
                // }
                // }


            });
        // for (let i = 0; i < this.employees.length; i++) {
        //     if (this.employees[i].username === value.username && this.employees[i].password === value.password && this.employees[i].usertype === "user") {
        //         this.router.navigate(['leave']);
        //     }
        //     else if (this.employees[i].username === value.username && this.employees[i].password === value.password && this.employees[i].usertype === "admin") {
        //         this.router.navigate(['admin']);
        //     } else {
        //         this.errorMsg = 'Username or password is incorrect';
        //     }
        // }

    }


}