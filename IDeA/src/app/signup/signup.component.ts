import { OpendatasoftV1Service } from './../opendatasoftV1.service';
import { NotifierService } from './../notifier.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public listEntreprises:any = new Array();
  public filteredOptions!: Observable<string[]>;

  SignUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    entreprise: new FormControl('', Validators.required)
  })


  constructor(public firebaseService: FirebaseService,
      public router: Router,
      public notifier: NotifierService,
      public opendatasoft: OpendatasoftV1Service,
      public loader: LoaderService
    ){

  }
  ngOnInit(): void {
    // console.log(this.firebaseService.status);
    this.loadEntreprises()

    this.filteredOptions = this.SignUpForm.get('entreprise')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    // this.loadEntreprises()

    if(localStorage.getItem('user')!==null)
      this.firebaseService.isLoggedIn = true;
    else
      this.firebaseService.isLoggedIn = false;
  }
  async submit(){
    if(!this.SignUpForm.valid){
      return;
    }
    const { email, password , entreprise} = this.SignUpForm.value;
    await this.loadEntreprises().then((result)=>{
      if (this.listEntreprises.includes(entreprise)){
        console.log('yes');
        this.firebaseService.signup(email, password, entreprise).then((res)=>{
          if(this.firebaseService.isLoggedIn){
            this.firebaseService.isLoggedIn = true;
            this.router.navigate([localStorage.getItem('status')]);
          }
        })
      }else{
        this.notifier.showNotification('This entreprise is invalid','OK','error')
      }
    });

  }



  get email(){
    return this.SignUpForm.get('email');
  }

  get password(){
    return this.SignUpForm.get('password');
  }

  get entreprise(){
    return this.SignUpForm.get('entreprise');
  }

  async loadEntreprises(){
    await this.opendatasoft.getListEntreprises().toPromise().then(
      response => {
        response.records.forEach((element: any) => {
          if (element.fields.denominationunitelegale != undefined) {
            this.listEntreprises.push(element.fields.denominationunitelegale);
          }
        });
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listEntreprises.filter((option:any) => option.toLowerCase().includes(filterValue));
  }

}
