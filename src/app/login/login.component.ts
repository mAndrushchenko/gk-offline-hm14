import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { authRequest } from "../../services/api/authRequest"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  isSubmit = false

  async onSubmit(loginForm: any) {
    const { email, password } = loginForm.form.value

    if (this.logForm.valid) {
      this.isSubmit = true
      await authRequest(email, password)
    }
    this.logData.email = ''
    this.logData.password = ''
  }

  showPassword = false

  getInputType() {
    if (this.showPassword) {
      return 'text'
    }
    return 'password'
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }

  logData = {
    email: '',
    password: ''
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
    })
  }

  get email() {
    return this.logForm.get('email')
  }

  get password() {
    return this.logForm.get('password')
  }
}
