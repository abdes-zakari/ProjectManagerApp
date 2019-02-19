import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ProjectViewComponent } from './Components/project-view/project-view.component';

// declare function myMethode():any;
@Component({
  providers:[ProjectViewComponent ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectManger';

  constructor(public router: Router,private route:ActivatedRoute,private projectComp: ProjectViewComponent ){}
  // console.log(this.router)
  ngOnInit(){
  	// myMethode();
  	// console.log(window.location);
  	// console.log(this.router);

  	// console.log(this.route.params.value);
  	// if (this.route.params) {
  	// 	this.route.params.subscribe(params => 
   //      console.log(params.id)
   //  )
  	// }

  } 

  clickNewProjectModal(){
  	// console.log('holaaaaaaaaaaaa');
  		// return this.projectComp.clickNewProjectModal();
  }
}
