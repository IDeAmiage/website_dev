import { LoaderService } from './../../../loader.service';
import { FirebaseService } from './../../../firebase.service';
import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from'lodash';

@Component({
  selector: 'app-opendata',
  templateUrl: './opendata.component.html',
  styleUrls: ['./opendata.component.css']
})
export class OpendataComponent implements OnInit {

  public liste: any;
  public test: any;
  selected = 'all';
  public listeCategory: any;
  public listeEnvironment: any;
  public listeSante: any;
  public listeTransport: any;


  constructor(private opendata: OpendatasoftV1Service,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public firebase: FirebaseService,
    public loader: LoaderService) {
      this.listeCategory=[];
      this.listeEnvironment=[];
      this.listeSante=[];
      this.listeTransport=[];
     }

  ngOnInit(): void {
    this.opendata.getCatalog().subscribe(
      response => {
        this.liste = response.records;
        console.log('response', this.liste);
        this.liste.forEach((l:any) =>{
          if(l.fields.language=== 'fr'){
            this.listeCategory.push(l.fields.theme);
            if(l.fields.theme && (l.fields.theme.split(',').includes('Environment') || l.fields.theme.split(';').includes('Environment'))){
              this.listeEnvironment.push(l);
            }
            if(l.fields.theme && (l.fields.theme.split(',').includes('Health') || l.fields.theme.split(';').includes('Health'))){
              this.listeSante.push(l);
            }
            if(l.fields.theme && (l.fields.theme.split(',').includes('Transport') || l.fields.theme.split(';').includes('Transport'))){
              this.listeTransport.push(l);
            }
          }
        });
      }
    )
  }

  public showTable(ds: any): void {
    this.opendata.current_dataset = ds;
    console.log(this.opendata.current_dataset);
  }

  public logout() {
    this.firebase.logout();
    this.router.navigate(['/']);
  }


}
