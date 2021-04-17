import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  employeeList: any[];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      processing: true,
      deferRender : true,
      //dom: 'Bfrtip',
      //buttons: [ 'copy', 'excel', 'csv' ]     
    };

    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any[]) => {
        this.employeeList = data;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
