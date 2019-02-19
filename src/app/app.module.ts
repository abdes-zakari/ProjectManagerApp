import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProjectViewComponent } from './Components/project-view/project-view.component';
import { TaskComponent } from './Components/task/task.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { CountdownComponent } from './Components/countdown/countdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TasklistComponent } from './Components/tasklist/tasklist.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectViewComponent,
    TaskComponent,
    CountdownComponent,
    TasklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '',component: ProjectViewComponent},
      {path: 'tasks',component: TasklistComponent},
      {path: 'task/:id',component: TaskComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
