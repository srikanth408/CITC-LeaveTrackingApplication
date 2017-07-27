import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RoutingComponent } from './app.routing';
import { routingModuleComponent } from './app.routing';
import { EmpDataService } from './app.model';
import { EmployeedataService } from './app.service';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';



@NgModule({
  imports: [BrowserModule, RoutingComponent, FormsModule, HttpModule,BrowserAnimationsModule,ToasterModule,Ng2FilterPipeModule],
  declarations: [AppComponent, routingModuleComponent],
  bootstrap: [AppComponent],
  providers: [EmpDataService, EmployeedataService]
})
export class AppModule { }
