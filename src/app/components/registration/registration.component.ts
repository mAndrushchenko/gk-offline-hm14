import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup;
  showPassword = false;
  isSubmit = false;
  regData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      this.isSubmit = true;
    }
    this.regData.email = '';
    this.regData.password = '';
  }

  getInputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    const { email, password, firstName, lastName, phoneNumber } = this.regData;

    this.regForm = this.fb.group({
      email: [email, [
        Validators.required,
        Validators.pattern('^[a-z]+\\.?[a-z]+@[a-z]+\\.[a-z]+$')
      ]],
      password: [password, [
        Validators.required,
        Validators.pattern('^((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\\d).*$'),
        Validators.minLength(8)
      ]],
      firstName: [firstName, [
        Validators.required,
        Validators.pattern('[a-zA-Zа-яА-Я]+'),
        Validators.minLength(2)
      ]],
      lastName: [lastName, [
        Validators.required,
        Validators.pattern('[a-zA-Zа-яА-Я]+'),
        Validators.minLength(2)
      ]],
      phoneNumber: [phoneNumber, [
        Validators.required,
        Validators.pattern('^\\+380\\d+'),
        Validators.minLength(13),
        Validators.maxLength(13)
      ]]
    });
  }

  get email(): AbstractControl | null {
    return this.regForm.get('email');
  }

  get password(): AbstractControl | null  {
    return this.regForm.get('password');
  }

  get firstName(): AbstractControl | null  {
    return this.regForm.get('firstName');
  }

  get lastName(): AbstractControl | null  {
    return this.regForm.get('lastName');
  }

  get phoneNumber(): AbstractControl | null  {
    return this.regForm.get('phoneNumber');
  }
}
