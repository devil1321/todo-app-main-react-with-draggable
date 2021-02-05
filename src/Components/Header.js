import React, { Component } from 'react'
import {DataConsumer} from '../api/context'
import sunIcon from '../images/icon-sun.svg'
import moonIcon from '../images/icon-moon.svg'
class Header extends Component {
  render() {
      let body = document.querySelector('body')
      let classList = body.classList
    return (
      <DataConsumer>
        {(data)=>{
          return(
            <React.Fragment>
              <div className="app__header d-flex j-c-sb">
                <h1>TODO</h1>
                <div className="app__icon-wrapper">
                    <img onClick={()=>{data.handleTheme()}} className="app__header-icon" src={data.themeState === "light" ? sunIcon : moonIcon} alt="icon"/>
                </div>
              </div>
            </React.Fragment>
          )
        }}
        
      </DataConsumer>
    )
  }
}

export default Header
