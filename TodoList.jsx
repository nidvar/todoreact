const start=()=>{
    if(localStorage.getItem('todos')!=null){
        return JSON.parse(localStorage.getItem('todos'))
    }else{
        return [];
    }
}
class TodoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            todos:[...start()],
            linethrough:false,
            searched:[...start()]
        }
    }
    search=(stuff)=>{
        const x = this.state.todos;
        const new_array = x.filter((item)=>{return item.title.includes(stuff)})
        this.setState({
            searched:new_array
        })
    }
    change_complete=(the_id)=>{
        const x = this.state.todos;
        //find index of the array using the ID
        const index = x.findIndex(item=>{return item.id === the_id});
        //if its completed, make it incomplete, vice versa
        x[index].completed===true?x[index].completed=false:x[index].completed=true;
        //set the state to the altere array and save it to local storage
        this.setState({todos: x},()=>{localStorage.setItem('todos', JSON.stringify(this.state.todos))})
    }
    edit=(the_id, change)=>{
        const x = this.state.todos;
        const index = x.findIndex(item=>{return item.id === the_id})
        x[index].title=change;
        this.setState({todos: x},()=>{localStorage.setItem('todos', JSON.stringify(this.state.todos))})
    }
    delete=(the_id)=>{
        const x = this.state.todos;
        const new_array = x.filter(item=>{return item.id !== the_id})
        this.setState({todos: new_array},()=>{
            localStorage.setItem('todos', JSON.stringify(this.state.todos))            
            const z = this.state.todos;
            this.setState({
                searched: z
            })
        })
    }
    display_todos=()=>{
        return this.state.searched.map((item)=>{
            return <Todo key={item.id} title={item.title} delete={this.delete} id={item.id} edit={this.edit} change={this.change_complete} />
        })
    }
    grab_todos=(the_todo_we_grabbed)=>{
        const x = {
            title:the_todo_we_grabbed,
            id:Math.random(),
            completed:false
        }
        this.setState((old)=>{
            return{todos:[...old.todos, x]}
        }, ()=>{
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
            const z = this.state.todos;
            this.setState({
                searched: z
            })
        })
    }
    render(){
        return(
            <div className='the_app'>
                <h4><b>Todo App</b></h4>
                <p><b>with ReactJS</b></p>
                <TodoForm function_one={this.grab_todos} search={this.search}/>
                {this.display_todos()}
            </div> 
        )
    }
}