import { environment } from './../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from './firebase.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NavComponent } from './entreprise/components/nav/nav.component';
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



@NgModule({
  declarations: [
    AppComponent,
    // NavComponent,
    SignupComponent,
    LoginComponent,
      AccueilComponent,
      NotifierComponent
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
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    FlexLayoutModule,
    EntrepriseRoutingModule,
    AppRoutingModule,

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
