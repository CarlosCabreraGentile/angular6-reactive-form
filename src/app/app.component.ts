import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from './services/countries.service';
import Country from './models/country.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  form: FormGroup;
  title:string = 'reactiveForm';
  countries: Country[] = [];
  index: number = null;

  constructor(private fb:FormBuilder, private countriesService: CountriesService) { 
   }

  ngOnInit(){
    this.form = this.fb.group({
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
        Validators.maxLength(30),
      ])],
      contact: this.fb.group({
        address: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])],
        phone: ['', Validators.compose([
          Validators.required,
          Validators.maxLength(10)
        ])]
      }),
      postMail: this.fb.group({
        country: [''],
      }),
      payment: this.fb.group({
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
    
    this.countriesService.getCountries()
    .subscribe(
      (data: Country[]) => {
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

  onCheckout() {
    if(this.form.valid){
      alert("Correct"); 
    }
    else{
      alert("Error");
    }
  }

}
