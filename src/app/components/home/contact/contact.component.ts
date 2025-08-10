import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, ContactFormData } from '../../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  private contactService = inject(ContactService);
  
  // UI state signals
  submissionStatus = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  successMessage = signal<string>('');
  emailAddress: string = 'info@eccellenza.rw';
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submissionStatus.set('submitting');
      
      const formData: ContactFormData = this.contactForm.value;
      
      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.submissionStatus.set('success');
            this.successMessage.set(response.message);
            this.contactForm.reset();
          } else {
            this.submissionStatus.set('error');
          }
        },
        error: () => {
          this.submissionStatus.set('error');
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }
} 