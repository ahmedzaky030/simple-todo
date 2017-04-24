"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_service_1 = require('../services/todo.service');
var TodosComponent = (function () {
    function TodosComponent(_todoService) {
        this._todoService = _todoService;
        console.log('inside todo component constructor');
        this.selectedTodo = null;
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('inside ng on init');
        this._todoService.getTodos().subscribe(function (todos) {
            _this.todos = todos;
            console.log(todos);
        });
    };
    TodosComponent.prototype.addTodo = function (event, todo) {
        var _this = this;
        console.log(todo);
        console.log(event);
        var result;
        var newTodo = {
            text: todo.value,
            isCompleted: false
        };
        result = this._todoService.saveTodo(newTodo);
        result.subscribe(function (x) {
            console.log('result of saveTodo');
            console.log(x);
            _this.todos.push(x);
            todo.value = '';
        });
    };
    TodosComponent.prototype.deleteTodo = function (id) {
        var _this = this;
        this._todoService.deleteTodo(id).subscribe(function (x) {
            console.log("inside deleteTodo Component result");
            console.log(x);
            if (x.ok && x.n) {
                var delTodoInd = _this.todos.findIndex(function (x) { return x._id == id; });
                _this.todos.splice(delTodoInd, 1);
            }
        });
    };
    TodosComponent.prototype.editTodo = function (todo) {
        console.log('inside editTodo');
        console.log(todo);
        this.selectedTodo = todo;
        console.log(this.selectedTodo);
    };
    TodosComponent.prototype.updateTodo = function (todo) {
        console.log(todo);
        this._todoService.updateTodo(todo._id.toString(), todo).subscribe(function (x) {
            console.log(x);
            console.log('Inside updateTodo Component');
        });
        this.selectedTodo = null;
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todo',
            templateUrl: 'todo.component.html'
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todo.component.js.map