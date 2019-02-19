import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import newProjectModalClose from'../../../assets/js/custom.js';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as glob from '../../global'; 

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

	showMenu:boolean=false;

    projects:any;

    addFormProject: FormGroup;

    successMsg: any;
    failedMsg: any;


    constructor(private formBuilder: FormBuilder,private http: HttpClient,public toastr: ToastrManager) {} 
  
    ngOnInit(){
        this.http.get(glob.url+'/?p=projects')
          .subscribe( data => {
          this.projects = data;
        });

        this.addFormProject = this.formBuilder.group({
          id: [],
          project: ['', Validators.required],
          description: [''],
          deadline: ['', Validators.required],
        });

    }

    toggleMenuBottom(id) {
      document.getElementById("Dropdown"+id).classList.toggle("show");
    }



    onSubmit() {
      
      if (this.addFormProject.valid) {
        this.http.post(glob.url+'/?p=project/add', this.addFormProject.value).
            subscribe( data => {
             if (data) {
             	this.showToast("Project Successfully Saved","success");
             	setTimeout(()=>{this.projects.unshift(data)}, 1000);
             }else{
             	this.showToast("Something went wrong ","error");
             }
           
        });

        this.addFormProject.reset();
      }else{
          this.showToast("Something went wrong ","error");
        }
    }
    showToast(msg,status) {

        if (status == "success") {
        	this.toastr.successToastr(msg, 'Success', {
                 position: 'top-center',
                 animate: 'slideFromTop',
                 toastTimeout:2000
            });
        }

        if (status == "error") {
        	this.toastr.errorToastr(msg, 'Error', {
                 position: 'top-center',
                 animate: 'slideFromTop'
            });
        }
    }

    clickNewProjectModal(){
    	console.log('clickNewProjectModal');
       this.successMsg='oplla';
       console.log(this.successMsg);
    }

    deleteProject(project){

    	this.http.post(glob.url+'/?p=project/delete', project.id).
        subscribe( data => {
        	   this.showToast(project.project+" Successfully deleted","success");
               this.projects = this.projects.filter(u => u !== project);
           
        });

    }

    formatWorkedTime(p){
      
      let sumSeconds = Number(p.sumWorkSeconds);

      let hours = Math.floor((sumSeconds/60)/60);

      let minutes = Math.floor((sumSeconds/60)%60);

      return hours+"h"+minutes+"min "; 
    }


    getPercent(project){

        let perc=0;
        let sumWorkedInMinutes=Number(project.sumWorkSeconds)/60;
        let sumDurationInMinutes=Number(project.duration)*60;
    	  if (sumDurationInMinutes  && sumWorkedInMinutes) {
    	      perc = Math.floor((sumWorkedInMinutes*100)/sumDurationInMinutes);
  
    	  }
    	 return perc;
    }


}
