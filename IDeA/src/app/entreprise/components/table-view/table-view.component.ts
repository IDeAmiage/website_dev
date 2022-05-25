import { OpendatasoftV1Service } from './../../../opendatasoftV1.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';

/**
 * This component display the data of a particular dataset in tabular format
 * We can download the data with different formats
 *
 * @export
 * @class TableViewComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  public table: any;
  public displayedColumns: any[] = [];
  public columnsToDisplay: any[] = [];

/**
 * Creates an instance of TableViewComponent.
 * @param {OpendatasoftV1Service} opendata
 * @memberof TableViewComponent
 */
constructor(public opendata: OpendatasoftV1Service) { }

  @ViewChild('paginatorRows') paginatorRows!: MatPaginator;
  @ViewChild('paginatorColumns') paginatorColumns!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

/**
 * On init load the dataset from previous component
 *
 * @memberof TableViewComponent
 */
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
/**
 * Method to display other columns that are invisible
 *
 * @param {PageEvent} page
 * @memberof TableViewComponent
 */
changeDisplayColumns(page: PageEvent){
    let start = page.pageIndex * page.pageSize;
    let end = page.pageIndex * page.pageSize + page.pageSize;
    this.columnsToDisplay = this.displayedColumns.slice(start, end);
  }
}
