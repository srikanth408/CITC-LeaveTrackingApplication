import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpDataService } from './app.model';
import { EmployeedataService } from './app.service';
import {ToasterContainerComponent, ToasterService,Toast,ToasterConfig} from 'angular2-toaster';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  loggedIn: any;
  
   public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    limit: 1
  });
 
  constructor(public router: Router, public empDataSr: EmpDataService, public _service: EmployeedataService, public toasterService: ToasterService) {


}

  popToast() {
    var toast: Toast = {
      type: 'info',
      title: 'Here is a Toast Title',
      body: 'Here is a Toast Body'
    };
    
    this.toasterService.pop(toast);
  }


  ngOnInit() {
    this.onRefresh();
  
  }
  get isLoggedIn() {
    return this.empDataSr.isLoggedIn();

  }

  get name(){
    if(this.empDataSr.empInfo.middleName===null){
         return this.empDataSr.empInfo.firstName+" "+ this.empDataSr.empInfo.lastName;
    }else{
      return this.empDataSr.empInfo.firstName+" "+ this.empDataSr.empInfo.middleName+" "+this.empDataSr.empInfo.lastName;
    }
   
  }
  Home() {
    var screen = '';
    switch (this.empDataSr.empInfo.userRole) {

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

  }

  get reload():boolean{
    return this.empDataSr.loading; 
  }

  logout() {
    this.empDataSr.logout();
    this.router.navigate(['']);
    localStorage.setItem('app_data', '');
  }
  setpassword() {
    this.router.navigate(['setpassword']);
  }

  onRefresh() {

    console.log("Just testing !!!!!!!!!!");
    let dt = localStorage.getItem("app_data");
    if (dt) {
      let value = JSON.parse(dt);
      this._service.getEmployees(value)
        .subscribe(resEmployeeData => {
          for (let item of resEmployeeData) {
            if (item.username === value.username && item.password === value.password) {
              //this.employees = item;
              this.empDataSr.setEmpInfo(item);
              this.empDataSr.loggedIn = true;
              switch (item.usertype) {
                case 'U': {
                  //screen = 'leave'
                  this.empDataSr.isAdmin = false;
                  break;
                }
                case 'A': {
                  //screen = 'admin'
                  this.empDataSr.isAdmin = true;
                  break;
                }
              }
            };
          }
        });
    }
  }

}
