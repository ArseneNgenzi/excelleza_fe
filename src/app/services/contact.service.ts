import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}


  sendContactForm(formData: ContactFormData): Observable<{ success: boolean, message: string }> {
    // Simulate an API call with a delay
    return of({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    }).pipe(delay(1500)); // Simulate network delay
  }
} 