import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { DatabaseService } from '@app/_services/database.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id: any;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private databseService:DatabaseService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            Name: ['', Validators.required],
            Price: ['', Validators.required],
        });

        this.title = 'Create Service';
        if (this.id) {
            // edit mode
            this.title = 'Edit Service';
            this.loading = true;
            this.databseService.getAppointment(parseInt(this.id))
                .pipe(first())
                .subscribe(x => {
                    let {date,start,end}=this.splitDateTime(x.data.startTime,x.data.endTime);
                    
                    
                    this.form = this.formBuilder.group({
                        date: [date, Validators.required],
                        start: [start, Validators.required],
                        end: [end, Validators.required],
                    });
                    console.log(start);
                    this.loading = false;
                });
        }
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

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
       
        const date = this.form.controls.date.value;
        const start = this.form.controls.start.value;
        const end = this.form.controls.end.value;

        const startdatetimeString = `${date}T${start}:00.000Z`;
        const startdatetime = new Date(startdatetimeString);

        // End datetime'i oluştur
        const enddatetimeString = `${date}T${end}:00.000Z`;
        const enddatetime = new Date(enddatetimeString);

        if (this.id) {
            let appointmentdata= {startDate:startdatetime,endDate:enddatetime}
            this.databseService.updateAppointment( parseInt(this.id),appointmentdata);
           
        } 
    }
}