import { LoaderService } from './../../../loader.service';
import { FirebaseService } from './../../../firebase.service';
import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {AtomSpinnerModule} from 'angular-epic-spinners'
import * as _ from 'lodash';

@Component({
  selector: 'app-opendata',
  templateUrl: './opendata.component.html',
  styleUrls: ['./opendata.component.scss']
})
export class OpendataComponent implements OnInit {
    cols : number | undefined;

    gridByBreakpoint = {
      xl: 4,
      lg: 4,
      md: 2,
      sm: 2,
      xs: 1
    }

  public liste:any;
  public test:any;
  public publish_date:any;
  selected = 'all';
  public listeCategory: any;
  public listeEnvironment: any;
  public listeSante: any;
  public listeTransport: any;
  public searchFilter:any = '';
  public query:any;

  constructor(private opendata: OpendatasoftV1Service,
              private router: Router,
              private route: ActivatedRoute,
              public firebase: FirebaseService,
              public loader: LoaderService,
              private breakpointObserver: BreakpointObserver) {
                this.listeCategory=[];
                this.listeEnvironment=[];
                this.listeSante=[];
                this.listeTransport=[];
                this.breakpointObserver.observe([
                  Breakpoints.XSmall,
                  Breakpoints.Small,
                  Breakpoints.Medium,
                  Breakpoints.Large,
                  Breakpoints.XLarge,
                ]).subscribe(result => {
                  if (result.matches) {
                    if (result.breakpoints[Breakpoints.XSmall]) {
                      this.cols = this.gridByBreakpoint.xs;
                    }
                    if (result.breakpoints[Breakpoints.Small]) {
                      this.cols = this.gridByBreakpoint.sm;
                    }
                    if (result.breakpoints[Breakpoints.Medium]) {
                      this.cols = this.gridByBreakpoint.md;
                    }
                    if (result.breakpoints[Breakpoints.Large]) {
                      this.cols = this.gridByBreakpoint.lg;
                    }
                    if (result.breakpoints[Breakpoints.XLarge]) {
                      this.cols = this.gridByBreakpoint.xl;
                    }
                  }
                });
              }



  ngOnInit(): void {
    this.opendata.getCatalog().subscribe(
      response => {
        this.liste = response.records;
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
