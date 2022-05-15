import { LoaderService } from './../../../loader.service';
import { FirebaseService } from './../../../firebase.service';
import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {AtomSpinnerModule} from 'angular-epic-spinners'


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


  constructor(private opendata: OpendatasoftV1Service,
              private router: Router,
              private route: ActivatedRoute,
              public firebase: FirebaseService,
              public loader: LoaderService,
              private breakpointObserver: BreakpointObserver) {
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
      response=>{
        this.liste = response.records;
        // this.publish_date = new Date(response.data_processed
        console.log(response);
      }
    )
  }

  public showTable(ds:any): void{
    this.opendata.current_dataset = ds;
    console.log(this.opendata.current_dataset);
  }

  public logout(){
    this.firebase.logout();
    this.router.navigate(['/']);
  }

}
