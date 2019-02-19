import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import * as glob from '../../global'; 

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  tasks:any;

  ngOnInit(){
        this.http.get(glob.url+'/?p=task/all')
          .subscribe( data => {
          this.tasks = data;
          console.log(data)
        });

    }

}
