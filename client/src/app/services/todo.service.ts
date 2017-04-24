import {Injectable} from '@angular/core';
import {Http , Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService{
    constructor(private _http:Http){
console.log('todo service has initialized');
    }


    getTodos(){
      return  this._http.get('http://localhost:3100/students').map(res => res.json());
    }


    saveTodo(todo:any){
        console.log('inside saveTodo');
        console.log(todo);
        var headers = new Headers();
        headers.set('Content-Type', 'application/json')
        return this._http.post('http://localhost:3100/students',JSON.stringify(todo), {headers:headers})
        .map(res => res.json())

    }

    deleteTodo(id:Number){
        console.log('inside deleteTodo');
        return this._http.delete('http://localhost:3100/students/'+id.toString()).map(res => res.json())
    }

    updateTodo(id:string , todo:any){
        var headers = new Headers();
        headers.set('Content-Type', 'application/json')
        return this._http.put('http://localhost:3100/students/'+id,JSON.stringify(todo),{headers: headers})
        .map(res=> res.json())
        
    }

    
}