import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { AccountService } from '@app/_services';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { DatabaseService } from '@app/_services/database.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

interface RandevuSaatleri {
    baslangic: string;
    bitis: string;
    isDisable:boolean;
  }
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
    appointmentdate:any;
    reservedDates:any;
    reservedTimes:any;

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
      selectedService: any;
      isEditable = false;

    async ngOnInit(): Promise<void> {
         await this.databaseService.getAllServices().subscribe(data=>{
            this.services=data.data;
        })
        
    }
    async submitAppointment(){
        const date = this.appointmentdate;
        const start = this.secilenSaat.split('-')[0];
        const end = this.secilenSaat.split('-')[1];

        const startdatetimeString = `${date}T${start}:00.000Z`;
        console.log(startdatetimeString);
        const startdatetime = new Date(startdatetimeString);

        // End datetime'i oluştur
        const enddatetimeString = `${date}T${end}:00.000Z`;
        const enddatetime = new Date(enddatetimeString);

        console.log(startdatetime);
        console.log(enddatetime);
        let user= { firstName:this.firstFormGroup.controls.name.value, lastName:this.firstFormGroup.controls.surName.value,phoneNumber:this.firstFormGroup.controls.phone.value }
        await this.databaseService.createUser(user).subscribe(async userdata=>{
            console.log(userdata);
            let appointment = { userId:userdata.data.id,serviceId:parseInt(this.selectedService),startTime:startdatetimeString,endTime:enddatetimeString}
            console.log(appointment);
            await this.databaseService.createAppointment(appointment).subscribe(data=>{
                console.log(data);
            });
        })
        
    }

    splitDateTime(dateTimeString: string,dateTimeString2: string) {
        const dateTime = new Date(dateTimeString);
        const dateTime2= new Date(dateTimeString2);
      
        const date = dateTime.toISOString().substring(0, 10);
        const time = dateTime.toISOString().substring(11, 16);
        const time2 = dateTime2.toISOString().substring(11, 16);
      
        return {
          date: date,
          start: time,
          end: time2
        };
      }
    async submitUser(){
        

    }
    async onSelectedService(){
       let serviceId= this.selectedService;
       console.log(this.selectedService);
        this.reservedDates= await this.databaseService.getServiceReservedDates(parseInt(serviceId)).toPromise();
        console.log(this.reservedDates);
        
        
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


    randevuSaatleri: RandevuSaatleri[] = [];
    secilenSaat: any;

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = this.formatNumberWithLeadingZero(date.getMonth() + 1);
        const day = this.formatNumberWithLeadingZero(date.getDate());
        return `${year}-${month}-${day}`;
      }
      
      formatNumberWithLeadingZero(number: number): string {
        return number < 10 ? '0' + number : '' + number;
      }
  
    onDateSelected(event: MatDatepickerInputEvent<Date>) {
        this.randevuSaatleri = [
            { baslangic: '09:00', bitis: '10:00',isDisable:false },
            { baslangic: '10:00', bitis: '11:00',isDisable:false },
            { baslangic: '13:00', bitis: '14:00',isDisable:false },
            { baslangic: '14:00', bitis: '15:00',isDisable:false },
            { baslangic: '15:00', bitis: '16:00',isDisable:false},
            { baslangic: '16:00', bitis: '17:00',isDisable:false},
          ];
        

        console.log(this.appointmentdate);
        const selectedDate = event.value;
        if (selectedDate !== null) {
            const formattedDate = this.formatDate(selectedDate);
            console.log(formattedDate);
            this.appointmentdate = formattedDate
        }
        else {
            return;
        }
        this.reservedDates.data.forEach((reserveddate:any) => {
           const{date,start,end} = this.splitDateTime(reserveddate.startTime,reserveddate.endTime)
            if (date==this.appointmentdate)
            {
                this.randevuSaatleri.forEach((time:RandevuSaatleri)=>{
                    if(time.baslangic==start){
                        time.isDisable=true;
                    }
                })

            }
            
        });
    }
  
    onSaatSelected() {
        
        
        console.log(this.secilenSaat);
      // Burada seçilen saate göre yapılacak işlemi gerçekleştirebilirsiniz.
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