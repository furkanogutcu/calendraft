import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { DatabaseService } from '@app/_services/database.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.less']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[]=[];
  

  constructor(private accountService: AccountService,
      private databaseService:DatabaseService) { }

  ngOnInit() {
      this.databaseService.getAppointments()
          .pipe(first())
          .subscribe(appointments =>{ 

            console.log(appointments);
            appointments.data.forEach( async (element:any) => {
              console.log(element);
             let   service = await this.databaseService.getService(element.serviceId).toPromise();
             console.log(service);
             let  user = await this.databaseService.getUser(element.userId).toPromise();
             console.log(user);
             let veri = {id:element.id,userName:(user.data.firstName+" " +user.data.lastName), serviceName:service.data.name, startTime: element.startTime,endTime:element.endTime}
              this.appointments.push(veri);
            });

           
            console.log(this.appointments);

          } );
      
  }

  deleteAppointment(id: string) {
      const account = this.appointments!.find(x => x.id === id);
      account.isDeleting = true;
      this.databaseService.deleteAppointment(parseInt(id))
          .pipe(first())
          .subscribe(() => {
              this.appointments = this.appointments!.filter(x => x.id !== id)
          });
  }
}
