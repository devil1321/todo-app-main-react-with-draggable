import React, { Component } from 'react'
import {DataConsumer} from '../api/context'
class Input extends Component {
  render() {
    return (
      <DataConsumer>
        {(data)=>{
          return(
            <React.Fragment>
              <div className="app__input-wrapper">
                   <label className="round">
                       <input className="app__top" type="checkbox" disabled/>
                       <span className="checkmark"></span>
                   </label>
                   <input onKeyUp={(e)=>{
                     
                     data.handleAddItem(e)
                   }} className='new-task' type="text" placeholder="Create a new todo"/>
              </div>
           </React.Fragment>
          )
        }}
      </DataConsumer>
      
    )
  }
}

export default Input
