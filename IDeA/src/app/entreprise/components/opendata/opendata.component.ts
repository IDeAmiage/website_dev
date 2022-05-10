import { LoaderService } from './../../../loader.service';
import { FirebaseService } from './../../../firebase.service';
import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-opendata',
  templateUrl: './opendata.component.html',
  styleUrls: ['./opendata.component.css']
})
export class OpendataComponent implements OnInit {

  public liste:any;
  public test:any;
  public searchFilter:any = '';
  public query:any;


  constructor(private opendata: OpendatasoftV1Service,
              private breakpointObserver: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute,
              public firebase: FirebaseService,
              public loader: LoaderService) {}

  ngOnInit(): void {
    this.opendata.getCatalog().subscribe(
      response=>{
        this.liste = response.records;
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