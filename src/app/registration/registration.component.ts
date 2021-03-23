import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm!: FormGroup

  constructor(private fb: FormBuilder) {}

  isSubmit = false

  onSubmit() {
    if (this.regForm.valid) {
      this.isSubmit = true
    }
    this.regData.email = ''
    this.regData.password = ''
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

  regData = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  }

  ngOnInit(): void {
    const { email, password, firstName, lastName, phoneNumber } = this.regData

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
    })
  }

  get email() {
    return this.regForm.get('email')
  }

  get password() {
    return this.regForm.get('password')
  }

  get firstName() {
    return this.regForm.get('firstName')
  }

  get lastName() {
    return this.regForm.get('lastName')
  }

  get phoneNumber() {
    return this.regForm.get('phoneNumber')
  }
}
