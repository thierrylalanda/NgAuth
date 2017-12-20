import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Http } from '@angular/http';
import { MatTableDataSource, MatPaginator, MatSort, MatSlideToggleChange } from '@angular/material';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { EditeUserFormComponent } from '../edite-user-form/edite-user-form.component';
@Component({
  moduleId : module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
 allPersonnels: any;
  constructor(private auth: AuthService,  public dialog: MatDialog, public snackBar: MatSnackBar, private http:Http) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }
  ngOnInit() {
    this.http.get('http://localhost:8080/GIC/admin?action=getPersonnels&vue=rien&region=11')
      .map(resp => resp.json())
      .subscribe(data=> {this.allPersonnels = data;console.log(this.allPersonnels)});
  }
  displayedColumns = ['select','position', 'name', 'weight', 'symbol','option'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<Element>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  // supprimer une selection
  deleteSelection(){
    console.log(this.selection.selected);
  }
  edit(element) {
    const datas= element;
    const dialogRef = this.dialog.open(EditeUserFormComponent, {
      width: '600px',
      hasBackdrop:false,
      autoFocus:true,
      backdropClass: 'static',
      data: datas
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(result, 'connecter vous', {
        duration: 5000,
      });
    });
  }
  slide(element) {
    confirm(`voulez reellement supprimer le numero ${element.position}`);
  }
  delete(element) {
    const datas= {text : `supprimer le numero ${element}`, url : 'lalanda/id' };
    if(confirm(`voulez reellement supprimer le numero ${element.position}`)){
      this.dataSource.data.forEach(row => {
        if(row.position== element.position){
          alert(row.position);
          this.dataSource.data.pop();
        }
      });
    }
  }
  addUser() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      hasBackdrop:false,
      autoFocus:true,
      backdropClass: 'static'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(result, 'connecter vous', {
        duration: 5000,
      });

    });
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
