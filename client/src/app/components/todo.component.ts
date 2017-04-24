import { Component , OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service'
@Component({
    moduleId:module.id,
  selector: 'todo',
  templateUrl: 'todo.component.html'
})
export class TodosComponent implements OnInit { 
    todos:Array<any>;
    selectedTodo:any ;

    constructor(private _todoService : TodoService){
console.log('inside todo component constructor');
this.selectedTodo = null;
    }

    ngOnInit(){
        console.log('inside ng on init');
        this._todoService.getTodos().subscribe(todos => {
            this.todos = todos;
            console.log(todos);
        }
        )}

       addTodo(event:Event , todo:HTMLInputElement) {
           console.log(todo);
           console.log(event);

           var result: any;
           var newTodo ={
               text: todo.value,
               isCompleted:false
           }

           result = this._todoService.saveTodo(newTodo);
           result.subscribe((x:any) => { 
               console.log('result of saveTodo');
               console.log(x);
               this.todos.push(x);
               todo.value = '';
            
        })
       }

       deleteTodo(id:Number){
           this._todoService.deleteTodo(id).subscribe((x:any) => {
               console.log("inside deleteTodo Component result");
               console.log(x);
               if(x.ok && x.n) {
                   var delTodoInd =   this.todos.findIndex(x => x._id == id);
             this.todos.splice(delTodoInd , 1);
               }
             

           })
       }

       editTodo(todo : any){
           console.log('inside editTodo');
           console.log(todo);
           this.selectedTodo = todo;
           console.log(this.selectedTodo);
       }

       updateTodo(todo:any){
           console.log(todo);
           this._todoService.updateTodo(todo._id.toString(),todo).subscribe((x:any)=>
           { 
               console.log(x);
               console.log('Inside updateTodo Component');
           });
           this.selectedTodo = null;
       }
 }
