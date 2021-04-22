import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authRequest } from '../../services/api/authRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm!: FormGroup;
  isSubmit = false;
  showPassword = false;

  logData = {
    email: '',
    password: ''
  };

  constructor(private fb: FormBuilder) {
  }

  public async onSubmit(loginForm: any): Promise<any> {
    const { email, password } = loginForm.form.value;

    if (this.logForm.valid) {
      this.isSubmit = true;
      await authRequest(email, password);
    }
    this.logData.email = '';
    this.logData.password = '';
  }

  public getInputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }


  ngOnInit(): void {
    this.logForm = this.fb.group({
      email: [this.logData.email, [
        Validators.required,
        Validators.pattern('^[a-z]+\\d*\\.?[a-z]+\\d*@[a-z]+\\.[a-z]+$')
      ]],
      password: [this.logData.email, [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  get email(): AbstractControl | null {
    return this.logForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.logForm.get('password');
  }
}
