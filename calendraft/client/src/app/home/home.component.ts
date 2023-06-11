import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { AccountService } from '@app/_services';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '@app/_services/database.service';

@Component({ 
    templateUrl: 'home.component.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService] })
export class HomeComponent implements OnInit {
    constructor(private accountService: AccountService,
        private databaseService:DatabaseService,
        private _formBuilder: FormBuilder) { }
    //token = this.accountService.accountValue.data.accessToken;
    public selectedDate: Date = new Date(2023, 6, 1);
    public showWeekend: boolean = false;
    public eventSettings: any = { dataSource: <Object[]>extend([], scheduleData, true) };
    public services:any;
    public date: Date = new Date("12/11/2023 1:00 AM");
    public savedUser:any;

    firstFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        surName: ['', Validators.required],
        phone: ['', Validators.required]
      });
      secondFormGroup = this._formBuilder.group({
        date: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required]
      });
      selectFormControl = new FormControl('', Validators.required);
      isEditable = false;

    async ngOnInit(): Promise<void> {
         await this.databaseService.getAllServices().subscribe(data=>{
            this.services=data.data;
        })
        
    }
    async submitAppointment(){
        const date = this.secondFormGroup.controls.date.value;
        const start = this.secondFormGroup.controls.start.value;
        const end = this.secondFormGroup.controls.end.value;

        const startdatetimeString = `${date}T${start}:00.000Z`;
        const startdatetime = new Date(startdatetimeString);

        // End datetime'i oluştur
        const enddatetimeString = `${date}T${end}:00.000Z`;
        const enddatetime = new Date(enddatetimeString);

        console.log(startdatetime);
        console.log(enddatetime);
        let user= { firstName:this.firstFormGroup.controls.name.value, lastName:this.firstFormGroup.controls.surName.value,phoneNumber:this.firstFormGroup.controls.phone.value }
        await this.databaseService.createUser(user).subscribe(async userdata=>{
            console.log(userdata);
            let appointment = { userId:userdata.data.id,serviceId:this.selectFormControl.value,startTime:startdatetime,endTime:enddatetime}
            console.log(appointment);
            await this.databaseService.createAppointment(appointment).subscribe(data=>{
                console.log(data);
            });
        })
        
    }
    async submitUser(){
        

    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
        }
    }
    

    
}
export let scheduleData: Object[] = [
    {
        Id: 1,
        Subject: 'rendez-vous',
        StartTime: new Date(2023, 6, 7, 9, 30),
        EndTime: new Date(2023, 6, 7, 11, 0),
        CategoryColor: '#1aaa55'
    }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        Location: 'Newyork City',
        StartTime: new Date(2023, 6, 7, 12, 0),
        EndTime: new Date(2023, 6, 7, 14, 0),
        CategoryColor: '#357cd2'
    }]