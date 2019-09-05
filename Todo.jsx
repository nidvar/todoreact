
class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            editing:false,
            title:'',
            style:{
                textDecoration:'none'
            } 
        }
    }
    delete=()=>{
        this.props.delete(this.props.id)
    }
    handleEdit=()=>{
        this.setState({editing:true})
        console.log('test')
    }
    done_editing=(e)=>{
        e.preventDefault()
        this.props.edit(this.props.id, this.state.title)
        this.setState({editing:false, title:''})
    }
    handleChange=(e)=>{
        this.setState({title:e.target.value})
    }
    toggle_completed=()=>{
        this.props.change(this.props.id)
        this.state.style.textDecoration==='line-through'?this.setState({style:{textDecoration:'none'}}):this.setState({style:{textDecoration:'line-through'}})
    }
    start=()=>{
        if(this.state.editing === false){
            return(
                <div className='todo'>
                    <div className='flex-container'>
                        <input onClick={this.toggle_completed} type='checkbox' />
                        <p style={this.state.style} >{this.props.title}</p>
                    </div>

                    <div className='flex-container2'>
                        <button className='btn btn-primary' onClick={this.handleEdit}>EDIT</button>
                        <button className='btn btn-danger' onClick={this.delete} >X</button>
                    </div>
                </div>
            )
        }else{
            return(
                <div className='todo'>
                    <form onSubmit={this.done_editing}>
                        <input onChange={this.handleChange} />
                        <button className='btn btn-success' >SUBMIT</button>
                    </form>    
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                {this.start()}
            </div>
        )
    }
}