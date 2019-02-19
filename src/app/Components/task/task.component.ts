import { Component, OnInit, Input  } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrManager } from 'ng6-toastr-notifications';
import * as glob from '../../global'; 

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  project:any;
  addFormTask: FormGroup;
  projectID:number;
  editFormTask: FormGroup;
  status: any;


  constructor(public router: Router,public toastr: ToastrManager,private route:ActivatedRoute,private http: HttpClient,private formBuilder: FormBuilder){}

  ngOnInit() {

  
    this.projectID = this.route.snapshot.params['id'];

    this.route.params.subscribe(params => 
        this.http.get(glob.url+'/?p=project/task/'+params.id)
          .subscribe( data => {
          this.project = data;
          
      })
    );
    this.addFormTask = this.formBuilder.group({
             name: [''],
             duration: [''],
             description: [''],
             id_project: this.projectID
    });

    this.editFormTask = this.formBuilder.group({
    	     id:[''],
             name: [''],
             description: [''],
             duration: [''],
             id_project: this.projectID,
             worked: [''],
             timer_seconds:[''],
             start_task:[''],
             end_task:['']
    });
    
  }

  onSubmit() {

    this.http.post(glob.url+'/?p=task/add', this.addFormTask.value).
        subscribe( data => {

            if (data) {

            	this.showToast("Task Successfully Saved","success");
            	this.project.tasks.push(data)

            }else{
            	this.showToast("Something went wrong ","error");
            }
           
        });


        this.addFormTask.reset({id_project: this.projectID });
    }

    showToast(msg,status) {

        if (status == "success") {
        	this.toastr.successToastr(msg, 'Success', {
                 position: 'top-center',
                 animate: 'slideFromTop'
            });
        }

        if (status == "error") {
        	this.toastr.errorToastr(msg, 'Error', {
                 position: 'top-center',
                 animate: 'slideFromTop'
            });
        }
    }

    deleteTask(task){

    	this.http.post(glob.url+'/?p=task/delete', task.id).
        subscribe( data => {
        	   this.showToast("Task Successfully deleted","success");
               this.project.tasks = this.project.tasks.filter(u => u !== task);
           
        });

    }

    getEditTask(task){

    	this.editFormTask.setValue({
    		 id:task.id,
             name:task.name,
             duration: task.duration,
             id_project: this.projectID,
             worked: task.worked,
             description: task.description,
             timer_seconds: task.timer_seconds,
             start_task: task.start_task,
             end_task: task.end_task
        });

    }

    updateTask(){

    	this.http.post(glob.url+'/?p=task/update', this.editFormTask.value).
        subscribe( data => {
   
        		this.showToast("Task Successfully Updated","success");
                const index = this.project.tasks.findIndex(e => e.id === this.editFormTask.value.id);
                this.project.tasks[index] = this.editFormTask.value;
        	
        });

    }

    handleStatusTask(worked,duration){

    	if (Number(worked) == 0) {
    		return "<i class='fas fa-check-circle false-status' title='Not started'></i>";
    	}

    	if (Number(worked) > 0 && Number(worked) < Number(duration))  {
    		return "<i class='fa fa-spinner fa-spin progress-status' title='In Progress'></i>";
    	}

    	if (Number(worked) === Number(duration)) {
    		return "<i class='fas fa-check-circle true-status' title='Completed'></i>";
    	}
    	

    }

    handleStatusTask2(task){
         
      let toSeconds=Number(task.duration)*60*60;
    	if (Number(task.timer_seconds) == 0) { 
    		return "<i class='fas fa-check-circle false-status' title='Not started'></i>";
    	}

    	if (Number(task.timer_seconds) > 0 && Number(task.timer_seconds) < Number(toSeconds))  { 
    		return "<i class='fa fa-spinner fa-spin progress-status' title='In Progress'></i>";
    	}

    	if (Number(task.timer_seconds) === Number(toSeconds)) { 
    		return "<i class='fas fa-check-circle true-status' title='Completed'></i>";
    	}
    	

    }

}

