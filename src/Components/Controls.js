import React, { Component } from 'react'
import {DataConsumer} from '../api/context'
class Controls extends Component {
  render() {
    return (
      <DataConsumer>
        {(data)=>{
          return(
            <React.Fragment>
              <div className="app__controls-lg d-flex j-c-sa a-i-c">
                  <p className='btn-left' onClick={(e)=>{data.handleActive(e)}}>{data.tasksLeft} left</p>
                  <div className="d-flex j-c-sa a-i-c">
                      <p className='btn-all' onClick={(e)=>{data.handleAll(e)}}>All</p>
                      <p className='btn-active' onClick={(e)=>{data.handleActive(e)}}>Active</p>
                      <p className='btn-completed' onClick={(e)=>{data.handleCompleted(e)}}>Completed</p>
                  </div>
                  <p className='btn-clear' onClick={(e)=>{data.handleClear(e)}} >Clear Completed</p>
              </div>
              <div className="app__controls-sm d-flex j-c-sb a-i-c">
                  <p className='btn-left' onClick={(e)=>{data.handleActive(e)}}>{data.tasksLeft} left</p>
                  <p className='btn-clear' onClick={(e)=>{data.handleClear(e)}}>Clear Completed</p>
              </div>
              <div className="app__controls-sm buttons d-flex j-c-sb a-i-c">
                  <div className="d-flex j-c-sa a-i-c">
                      <p className='btn-all' onClick={(e)=>{data.handleAll(e)}}>All</p>
                      <p className='btn-active' onClick={(e)=>{data.handleActive(e)}}>Active</p>
                      <p className='btn-completed' onClick={(e)=>{data.handleCompleted(e)}}>Completed</p>
                  </div>
              </div>
            </React.Fragment>
          )
        }}
      </DataConsumer>
    )
  }
}

export default Controls
