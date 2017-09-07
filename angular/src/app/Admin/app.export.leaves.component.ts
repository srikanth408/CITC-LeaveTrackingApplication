import { Component } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { EmployeedataService } from '../app.service';



@Component({
    selector: 'export-leave',
    templateUrl: './app.export.leaves.component.html',
    providers: [EmployeedataService],

})

export class ExportLeavesComponent {
    exportLeave:any ={};
    exportDateValid:boolean=false;
    export_todate_errorMsg:any;
    monthlyLeaveHistory:any;

     public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
    };
    constructor(public _restfull: EmployeedataService) { }

    onSubmitExportLeaveHistory(value:any,opt:any){
         value.fromDate = this.exportLeave.fromdate.formatted;
        value.toDate = this.exportLeave.todate.formatted;
        this._restfull.getAllLeavesHistory(value.fromDate,value.toDate)
            .subscribe((res) => {this.monthlyLeaveHistory=res;
    
        });
           opt.resetForm();
           
   }
    onDateChange(value, dtType){
         var _fromdate = this.exportLeave.fromdate ? this.exportLeave.fromdate.formatted : '';
        var _todate = this.exportLeave.todate ? this.exportLeave.todate.formatted : '';
        if (dtType === 'F') {
            _fromdate = value.formatted;
        } else if (dtType === 'T') {
            _todate = value.formatted;
        }

        var fromdate = new Date(_fromdate);
        var todate = new Date(_todate);
    
    if (todate.getTime() < fromdate.getTime()) {
            this.exportDateValid = true;
            this.export_todate_errorMsg = " * Todate can't be Lessthan Fromdate";
        } else {
            this.export_todate_errorMsg = "";
            this.exportDateValid = false;
        }
    }

}