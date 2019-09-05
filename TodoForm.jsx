class TodoForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.function_one(this.state.title)
        this.setState({
            title:''
        })
    }
    handleChange=(e)=>{
        this.setState({
            title:e.target.value
        })
    }
    render(){
        return(
            <div className='todoform'>
                <form onSubmit={this.handleSubmit} >
                    <input onChange={this.handleChange} value={this.state.title} /> <button className='btn btn-success'>Add</button>
                </form>
            </div>
        )
    }
}