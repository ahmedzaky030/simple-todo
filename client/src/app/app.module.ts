import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { FormsModule }      from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { TodosComponent }  from './components/todo.component';

@NgModule({
  imports:      [ BrowserModule , FormsModule , HttpModule],
  declarations: [ AppComponent , TodosComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
