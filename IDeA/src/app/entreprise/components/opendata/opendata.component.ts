import { LoaderService } from './../../../loader.service';
import { FirebaseService } from './../../../firebase.service';
import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
/**
 * This component display some opendata datasets provided by opendatasoft
 * They can be filter by categories and also a searchbar
 *
 * @export
 * @class OpendataComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-opendata',
  templateUrl: './opendata.component.html',
  styleUrls: ['./opendata.component.scss'],
})
export class OpendataComponent implements OnInit {
  cols: number | undefined;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1,
  };

  public liste: any;
  public test: any;
  public publish_date: any;
  selected = 'all';
  public listeCategory: any;
  public listeEnvironment: any;
  public listeSante: any;
  public listeTransport: any;
  public searchFilter: any = '';
  public query: any;
  /**
   * Creates an instance of OpendataComponent.
   * @param {OpendatasoftV1Service} opendata
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {FirebaseService} firebase
   * @param {LoaderService} loader
   * @param {BreakpointObserver} breakpointObserver
   * @memberof OpendataComponent
   */
  constructor(
    private opendata: OpendatasoftV1Service,
    private router: Router,
    private route: ActivatedRoute,
    public firebase: FirebaseService,
    public loader: LoaderService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.listeCategory = [];
    this.listeEnvironment = [];
    this.listeSante = [];
    this.listeTransport = [];
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
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

  /**
   * Fetch the data and create categories
   *
   * @memberof OpendataComponent
   */
  ngOnInit(): void {
    this.opendata.getCatalog().subscribe((response) => {
      this.liste = response.records;
      this.liste.forEach((l: any) => {
        if (l.fields.language === 'fr') {
          this.listeCategory.push(l.fields.theme);
          if (
            l.fields.theme &&
            (l.fields.theme.split(',').includes('Environment') ||
              l.fields.theme.split(';').includes('Environment'))
          ) {
            this.listeEnvironment.push(l);
          }
          if (
            l.fields.theme &&
            (l.fields.theme.split(',').includes('Health') ||
              l.fields.theme.split(';').includes('Health'))
          ) {
            this.listeSante.push(l);
          }
          if (
            l.fields.theme &&
            (l.fields.theme.split(',').includes('Transport') ||
              l.fields.theme.split(';').includes('Transport'))
          ) {
            this.listeTransport.push(l);
          }
        }
      });
    });
  }

  /**
   * Show the table corresponding to the dataset
   * Call the table-view component
   *
   * @param {*} ds
   * @memberof OpendataComponent
   */
  public showTable(ds: any): void {
    this.opendata.current_dataset = ds;
  }
}
