import {map} from 'rxjs/internal/operators';
import { Component, OnInit, Input  } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import * as moment from 'moment';
import * as glob from '../../global'; 

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input() task: any;
  time:any;
  private _hours: number = 0;
  private _minutes: number = 0;
  private _seconds: number = 0;
  runTimer:any = false;
  startTask:any;
  btnStart: boolean = true;
  btnStop: boolean = false;
  myBtn: boolean = false;
  _taskStatus: boolean = false;

  constructor(private http: HttpClient) {}


  ngOnInit() {

        if (this.task.timer_status==1) {
        	this.btnStop = true;
            this.btnStart = false;
            this._taskStatus = true;
        }
  	    this.time =this.gerHours(this.task.timer_seconds)+":"+this.getMinutes(this.task.timer_seconds)+":"+this.getSeconds(this.task.timer_seconds);
  	    this.runCounter(this.task.timer_seconds);
        this.time = this.time.split(":");
        this._hours=Number(this.time[0]);
        this._minutes=Number(this.time[1]);
        this._seconds=Number(this.time[2]);

        interval(1000).subscribe((x) => {
  	    	if (this.runTimer==true) {
                  this.updateTime();
            }
        });
  }

  enableDisbale(){
     if (this.myBtn==true) {
     	this.myBtn=false;
     	console.log('1');
     	console.log(this.myBtn);
     }else{
     	this.myBtn=true;
     	console.log('2');
     	console.log(this.myBtn);
     }
     
  }
  startTimer(){

    if (this.task.timer_seconds != this.task.duration*60*60) {
        this.startTask =  this.getCurrentDatetime();// current datetime
        let data={
        	       start_task : this.startTask,
        	       timer_status : 1
        	     };
        this.updateTask(data);
  	    this.runTimer=true;
  	    this.btnStop = true;
        this.btnStart = false;
        this._taskStatus = true;
    }

  }

  stopTimer(){

  	this.runTimer=false;
  	let newTime =this._hours+":"+this._minutes+":"+this._seconds;
  	let endTask=this.getCurrentDatetime();
  	let startTask= this.startTask ? this.startTask : this.task.start_task;
  	let diff = moment.duration(moment(endTask).diff(moment(startTask)));
  	let new_timer =diff.asSeconds();
    let final_timer =Number(this.task.timer_seconds)+Number(new_timer);

  	let data={
              end_task : endTask,
  			  timer_status : 0,
  			  timer_seconds: final_timer  
  			 };

    this.updateTask(data);
    this.btnStop = false;
    this.btnStart = true;
    this._taskStatus = false;
    this.task.worked=this.getMinutes(final_timer);
    this.task.timer_seconds=final_timer;

  }

  updateTime(){
  	if (this._seconds==59) {
  	  	this._minutes = this._minutes+1;
  	  	this._seconds = 0;
  	}else{
  		this._seconds = this._seconds+1;
  	}

  	if (this._minutes==59) {
  	  	this._hours = this._hours+1;
  	  	this._minutes = 0;
  	  	this._seconds = 0;
  	}
  }
    
    updateTask(data){
        
        let obj={
        	id:this.task.id
        }

        Object.keys(data).forEach(key => {
              let item={[key]:data[key]};
              obj=Object.assign(obj,item);
        });
        console.log(obj);
    	this.http.post(glob.url+'/?p=task/update', obj).subscribe();

    }


    getCurrentDatetime(){

    	return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    gerHours(t){

    	return  Math.floor((t / 60 ) / 60);
    }

    getMinutes(t){
    	
    	return Math.floor((t / 60 ) % 60); 

    }
    getSeconds(t){
        return Math.floor(t % 60);
    }

    padNumber(num){

        if (num == 0 || num < 10) {

        	num = '0'+num;
        }

        return num;
    }
    
    runCounter(seconds){
    	if (this.task.timer_status==1) {
    		let diff = moment.duration(moment(this.getCurrentDatetime()).diff(moment(this.task.start_task)));

  	        let diffInSeconds =Number(diff.asSeconds())+Number(seconds);

  	        this.time =this.gerHours(diffInSeconds)+":"+this.getMinutes(diffInSeconds)+":"+this.getSeconds(diffInSeconds);
  	        this.runTimer=true

    	}
    }

      updateTaskOLD(data){
        
        let obj={
        	id:this.task.id
        }

        Object.keys(data).forEach(key => {
              let item={[key]:data[key]};
              obj=Object.assign(obj,item);
        });

    }


}