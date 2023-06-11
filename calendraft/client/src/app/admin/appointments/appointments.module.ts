import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddEditComponent } from './add-edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppointmentsComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
