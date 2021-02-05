import React, { Component } from 'react'
import crossIcon from '../images/icon-cross.svg'
import {DataConsumer} from '../api/context'
class ListItem extends Component {
  render() {
    const {completed,name} = this.props.data
    return (
     <DataConsumer>
    {(data)=>{
        return(
            <div className="app__task d-flex a-i-c">
               <div className={completed ? "task-text d-flex a-i-c completed" : "task-text d-flex a-i-c"}>
               <label className="round">
                    <input className={completed ? 'completed' : ''} type="checkbox" checked={completed}   onChange={(e)=>{data.handleCompletedCheck(e)}}/> 
                    <span className="checkmark"></span>
                 </label>
                 <p className={completed ? "completed-text" : ""}>{name}</p>
                </div>
                 <img onClick={(e)=>{data.handleRemoveItem(e)}} style={completed ? {display:"block"} : {display:"none"}} className='cross' src={crossIcon} alt="cross-icon" />
            </div>
        )
    }}
     </DataConsumer>
    )
  }
}

export default ListItem
