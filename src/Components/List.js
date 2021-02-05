import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {DataConsumer} from '../api/context'
import ListItem from './ListItem'
class List extends Component {


    render() {
        return ( 
            <DataConsumer>   
            {(data)=>{
                return(
                    <DragDropContext onDragEnd={(e)=>{data.handleOnDragEnd(e)}}>
                        <Droppable droppableId="app__list">
                        {(provided)=>(
                            <ul className="app__list" {...provided.droppableProps} ref={provided.innerRef}>
                            {data.localTasks.map((task,index)=>{
                                return(
                                   <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                       {(provided)=>(
                                        <li className='app__item column d-flex j-c-sb' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={task.id} >
                                            <ListItem data={task}/>
                                        </li>

                                       )}
                                   </Draggable>
                                )
                            })}
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                    </DragDropContext>
                )
            }}
            </DataConsumer>
      
        )
    }
}

export default List