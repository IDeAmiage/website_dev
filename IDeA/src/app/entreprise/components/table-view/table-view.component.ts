import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, AfterViewInit {

  public table: any;
  public displayedColumns: any[] = [];
  public columnsToDisplay: any[] = [];

  constructor(public opendata: OpendatasoftV1Service) { }

  @ViewChild('paginatorRows') paginatorRows!: MatPaginator;
  @ViewChild('paginatorColumns') paginatorColumns!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.opendata.getDataset(this.opendata.current_dataset).subscribe(
      response => {
        this.displayedColumns = Object.keys(response.records[0].fields);
        this.columnsToDisplay = this.displayedColumns.slice(0, 6);

        this.table = new MatTableDataSource(response.records);
        this.table.sort = this.sort;
        this.table.paginator = this.paginatorRows;
      }
    )
  }

  changeDisplayColumns(page: PageEvent){
    let start = page.pageIndex * page.pageSize;
    let end = page.pageIndex * page.pageSize + page.pageSize;
    this.columnsToDisplay = this.displayedColumns.slice(start, end);
  }
}
