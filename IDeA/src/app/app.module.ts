import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InterceptorService } from './interceptor.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './../environments/environment.prod';
import { FirebaseService } from './firebase.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { CollectivitesModule } from './collectivites/collectivites.module';
import { ParticuliersModule } from './particuliers/particuliers.module';
import { AngularFireModule } from '@angular/fire/compat';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EntrepriseRoutingModule } from './entreprise/entreprise-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AccueilComponent } from './accueil/accueil.component';
import { NotifierComponent } from './notifier/notifier.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LottieModule } from 'ngx-lottie';
import { AtomSpinnerModule } from 'angular-epic-spinners';
import {MatTooltipModule} from '@angular/material/tooltip';
import player from 'lottie-web';
import { CGUComponent } from './CGU/CGU.component';

registerLocaleData(localeFr, 'fr');

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AccueilComponent,
    NotifierComponent,
    ForgotPasswordComponent,
      CGUComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    EntrepriseModule,
    CollectivitesModule,
    ParticuliersModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    EntrepriseRoutingModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    AtomSpinnerModule,
    MatTooltipModule,

  ],
  providers: [
    FirebaseService,
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
