import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, AfterViewInit {

  public table:any;
  public displayedColumns :any;

  constructor(public opendata: OpendatasoftV1Service) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.opendata.getDataset(this.opendata.current_dataset).subscribe(
      response => {
        this.displayedColumns = Object.keys(response.records[0].fields);
        this.table = new MatTableDataSource(response.records);
        this.table.sort = this.sort;
        this.table.paginator = this.paginator;
      }
    )



  }

}
