import React, {Component} from 'react';

class App extends Component {
    state = {
        todos: [
            {id: 1, name: 'Go to school'},
            {id: 2, name: 'Write some code'},
            {id: 3, name: 'Play a football'}
        ],
        newItem: "",
        editing: false,
        updateIndex: null
    };

    handleInput(event) {
        this.setState({newItem: event.target.value})
    };

    editingTodo = (index) => {
        let todo = this.state.todos[index];
        this.setState({
            editing: true,
            newItem: todo.name,
            updateIndex: index,
            notification:null
        })
    };
    generateTodoId(){
        const lastTodo = this.state.todos[this.state.todos.length -1];
       if(lastTodo){
           return lastTodo.id+1
       } else {
           return 1;
       }
    }
    addTodo = () => {
        let newItem = {
            id:this.generateTodoId(),
            name: this.state.newItem
        };
        let oldTodos = this.state.todos;
        let todos = [...oldTodos, newItem];
        this.setState({
            todos: todos,
            newItem: '',
        })
        this.alert('Added successfully','primary')
    };
    updateTodo = () => {
        let todos = this.state.todos;
        todos[this.state.updateIndex].name = this.state.newItem;
        this.setState({
            todos: todos,
            editing: false,
            newItem: '',
        });
        this.alert('Update successfully','secondary')

    };
    handleDelete = (idx) =>{
        let todos = this.state.todos.filter((item,index)=> index !==idx);
        this.setState({todos})
        this.alert('Dlete successfully','danger')
        };
alert =(notification,type)=>{
    this.setState({notification:[notification,type]});
    setTimeout(()=>{
        this.setState({notification:null})
    }, 1500);
};
    render() {
        return (
            <div>
                <div className="App">
                    <div className="container">
                        <h2 className="text-center p-4">Todo app</h2>
                        {
                            this.state.notification &&
                            <div className={`alert alert-${this.state.notification[1]}`}>
                                {this.state.notification[0]}
                            </div>
                        }

                        <input
                            type="text"
                            className="form-control my-4"
                            placeholder="Add new item"
                            onChange={this.handleInput.bind(this)}
                            value={this.state.newItem}
                        />
                        <button
                            className="btn-info mb-3 btn-sm form-control"
                            onClick={this.state.editing ? this.updateTodo : this.addTodo}>
                            {this.state.editing ? 'update' : 'Add item'}
                        </button>
                        {!this.state.editing &&
                        <ul className="list-group">

                            {this.state.todos.map((item, index) => (
                                <li className="list-group-item" key={item.id}>
                                    <button className={'btn btn-info  mr-4'}
                                            onClick={() => this.editingTodo(index)}
                                    >update
                                    </button>
                                    {item.name}
                                    <button className={'btn btn-danger  ml-4'}
                                            onClick={() => this.handleDelete(index)}
                                    >Delete
                                    </button>
                                </li>
                            ))}

                        </ul>}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
