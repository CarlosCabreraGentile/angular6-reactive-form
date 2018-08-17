import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  title:string = 'reactiveForm';
  countries: Array<any> = [];
  index: number = null;

  constructor(private fb:FormBuilder, private countriesService: CountriesService) {
    this.form = fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10), 
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ])],
      userName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(16)
      ])],
      contact: fb.group({
        address: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])],
        phone: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])]
      }),
      postMail: fb.group({
        country: [''],
      }),
      payment: fb.group({
        cardName: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])],
        cardNumber: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(16)
        ])],
        expiration: ['', Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])],
        cvv: ['', Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3)
        ])],
      }),
    })
    console.dir(this.form);
    
    countriesService.getCountries()
    .subscribe(
      (data: any) => {
        this.countries = data;
        console.dir(this.countries);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  setIndex(event: any){
    this.index = event.target.selectedIndex - 1;
    // console.log(this.index);
  } 

}
