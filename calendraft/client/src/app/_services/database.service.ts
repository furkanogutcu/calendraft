import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';


import { environment } from '@environments/environment';
import { Account } from '@app/_models';
import { AccountService } from './account.service';



@Injectable({ providedIn: 'root' })

export class DatabaseService {
    constructor(private http: HttpClient,
        private accountService:AccountService) {}
    private baseUrl = `${environment.apiUrl}`;

    createAdmin(adminData: any): Observable<any> {
      const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        
        return this.http.post(`${this.baseUrl}/admin/admins`, adminData,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/admins
      getAdmins(): Observable<any> {
       const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/admins`, {
            headers: httpHeaders
          });
      }
    
      // GET /admin/admins/{adminId}
      getAdmin(adminId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/admins/${adminId}`,{
          headers: httpHeaders
        });
      }
    
      // DELETE /admin/admins/{adminId}
      deleteAdmin(adminId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.delete(`${this.baseUrl}/admin/admins/${adminId}`,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/users
      getUsers(): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/users`,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/users/{userId}
      getUser(userId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/users/${userId}`,{
          headers: httpHeaders
        });
      }
    
      // DELETE /admin/users/{userId}
      deleteUser(userId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.delete(`${this.baseUrl}/admin/users/${userId}`,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/users/{userId}/appointments
      getUserAppointments(userId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/users/${userId}/appointments`,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/appointments
      getAppointments(): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/appointments`,{
          headers: httpHeaders
        });
      }
    
      // GET /admin/appointments/{appointmentId}
      getAppointment(appointmentId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/admin/appointments/${appointmentId}`,{
          headers: httpHeaders
        });
      }
    
      // PATCH /admin/appointments/{appointmentId}
      updateAppointment(appointmentId: number, appointmentData: any): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.patch(`${this.baseUrl}/admin/appointments/${appointmentId}`, appointmentData,{
          headers: httpHeaders
        });
      }
    
      // DELETE /admin/appointments/{appointmentId}
      deleteAppointment(appointmentId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.delete(`${this.baseUrl}/admin/appointments/${appointmentId}`,{
          headers: httpHeaders
        });
      }

      getAllServices(): Observable<any> {
        
        return this.http.get(`${this.baseUrl}/services`);
      }

      // GET /admin/appointments/{appointmentId}
      getService(serviceId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.get(`${this.baseUrl}/services/${serviceId}`,{
          headers: httpHeaders
        });
      }
    
      // POST /admin/services
      createService(serviceData: any): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.post(`${this.baseUrl}/admin/services`, serviceData,{
          headers: httpHeaders
        });
      }
    
      // PATCH /admin/services/{serviceId}
      updateService(serviceId: number, serviceData: any): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.patch(`${this.baseUrl}/admin/services/${serviceId}`, serviceData,{
          headers: httpHeaders
        });
      }
    
      // DELETE /admin/services/{serviceId}
      deleteService(serviceId: number): Observable<any> {
        const token= this.accountService.accountValue.data.accessToken;
       const httpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        });
        return this.http.delete(`${this.baseUrl}/admin/services/${serviceId}`,{
          headers: httpHeaders
        });
      }

      
      createAppointment(appointment:any): Observable<any> {
        return this.http.post(`${this.baseUrl}/appointments/`,appointment);
      }

      createUser(user:any): Observable<any> {
        return this.http.post(`${this.baseUrl}/users/`,user);
      }


}