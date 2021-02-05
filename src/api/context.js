import React, { Component } from 'react'
import { useState } from 'react';
const DataContext = React.createContext();
class DataProvider extends Component {
    constructor(props){
        super()
        this.state = {
            themeState:'light',
            orginalTasks:[
                {   
                    id:1,
                    name: 'Complete online JavaScript course',
                    completed: true
                },
                {   
                    id:2,
                    name: 'Jog around the park 3x',
                    completed: false
                },
                {   
                    id:3,
                    name: '10 minutes meditation',
                    completed: false
                },
                {   
                    id:4,
                    name: 'Read for one hour',
                    completed: false
                },
                {   
                    id:5,
                    name: 'Pick up grocieries',
                    completed: false
                },
                {   
                    id:6,
                    name: 'Complete Todo App on Front End Mentor',
                    completed: false
                }],
            localTasks:[],
            allTasks:[],
            input:'',
            tasksLeft:0
        }
    }
  
componentDidMount(){
    this.setLocalStorage()
}

setLocalStorage = () =>{
    let isLocal
    isLocal = localStorage.getItem('isLocal')
    isLocal = JSON.parse(isLocal)
    if(isLocal === null){
        localStorage.setItem('tasks',JSON.stringify(this.state.orginalTasks))
        let tasks = localStorage.getItem('tasks')
        tasks = JSON.parse(tasks)
        let tasksLeft = this.state.orginalTasks
        this.handleSetLeft(tasksLeft) 
        this.setState({
            localTasks:tasks
        },()=>{
            localStorage.setItem('isLocal',true)
            isLocal = localStorage.getItem('isLocal')
            isLocal = JSON.parse(isLocal)
        })
        this.setState({
                allTasks:tasks
        })
    } else{
        let tasks = localStorage.getItem('tasks')
        tasks = JSON.parse(tasks)
        this.handleSetLeft(tasks)
        this.setState({
            localTasks:tasks
        })
        this.setState({
                allTasks:tasks
        })
    }
}
handleOnDragEnd = (result) =>{
    const items = Array.from(this.state.localTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    this.setState({
        localtasks:items
    },()=>{
        this.handleUpdateStorage(items)
    });

}
handleBtnColor = (e) =>{
    let modifiers = document.querySelectorAll('.blue')
    modifiers.forEach(modifier=>{
        modifier.classList.remove('blue')
    })
    e.target.classList.add('blue')
}
handleTheme = () => {
    let body = document.querySelector('body')
    if(body.classList.contains('light')){
        body.classList.remove('light')
        this.setState({
            themeState:'dark'
        })
    } else {
        body.classList.add('light')
        this.setState({
            themeState:'light'
        })
    }
}
    
handleSetLeft(tasks){
    tasks = tasks.filter(task=>task.completed !== true)
    let left = tasks.length
    this.setState({
        tasksLeft:left
    })
}

handleUpdateStorage = (tasks) =>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
    let storage = localStorage.getItem('tasks')
    storage = JSON.parse(storage)
    this.setState({
        localTasks:storage
    })
    this.setState({
        allTasks:tasks
    })
}
handleCompletedCheck = (e) =>{
    let tempTasks = this.state.localTasks
    let activeTaskName = e.target.parentElement.nextElementSibling.textContent
    let activeTask = tempTasks.find(task => task.name === activeTaskName)
    let index = tempTasks.indexOf(activeTask)
    if(tempTasks[index].completed){
        tempTasks[index].completed = false
  
    } else{
        tempTasks[index].completed = true
    }
    this.setState({
        tasks:tempTasks
    },()=>{
        this.handleUpdateStorage(tempTasks)
        this.handleSetLeft(tempTasks)
    })
}
handleAddItem = (e)=>{
    e.preventDefault();
    let inputVal = e.target.value
    function TASK(id,name,completed){
        this.id = id;
        this.name = name
        this.completed = completed;
    }
    this.setState({
        input:inputVal
    },()=>{
        if(e.keyCode === 13){    
            let id = this.state.localTasks.length + 1  
            let name = this.state.input
            let newTask = new TASK(id,name,false)
            let tasks = this.state.localTasks
            tasks.push(newTask)
            this.setState({
                localtasks:tasks
            },()=>{
                this.handleUpdateStorage(tasks)
                this.handleSetLeft(tasks)
            })
        }
    })
}
handleRemoveItem = (e) =>{
    let itemText = e.target.previousElementSibling.textContent
    let tasks = this.state.localTasks
    tasks = tasks.filter(task=>task.name !== itemText)
    this.setState({
        localTasks:tasks
    },()=>{
        this.handleUpdateStorage(tasks)
    })
}
handleClear = (e) =>{
    let tempTasks = this.state.allTasks
    tempTasks = tempTasks.filter(task => task.completed === false)
    this.setState({
        localTasks:tempTasks
    },()=>{
        this.handleUpdateStorage(this.state.localTasks)
        this.handleSetLeft(this.state.localTasks)
    })
    this.handleBtnColor(e)
    
}
handleAll = (e) =>{
    this.setState({localTasks:this.state.allTasks})
    this.handleBtnColor(e)
}
handleActive = (e)=>{
    let tempTasks = this.state.allTasks
    tempTasks = tempTasks.filter(task=>task.completed === false)
    this.setState({localTasks:tempTasks})
    this.handleBtnColor(e)
}
handleCompleted = (e)=>{
    let tempTasks = this.state.allTasks
    tempTasks = tempTasks.filter(task=>task.completed === true)
    this.setState({localTasks:tempTasks})
    this.handleBtnColor(e)
}
  render() {
    return (
      <DataContext.Provider value={{
          ...this.state,
          handleOnDragEnd:this.handleOnDragEnd,
          handleTheme:this.handleTheme,
          handleBtnColor:this.handleBtnColor,
          handleCompletedCheck:this.handleCompletedCheck,
          handleAddItem:this.handleAddItem,
          handleRemoveItem:this.handleRemoveItem,
          handleClear:this.handleClear,
          handleAll:this.handleAll,
          handleActive:this.handleActive,
          handleCompleted:this.handleCompleted
      }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}
const DataConsumer = DataContext.Consumer;
export {DataProvider,DataConsumer}
