import React from 'react'
import './scss/styles.scss'
import Header from './Components/Header'
import Input from './Components/Input'
import List from './Components/List'
import Controls from './Components/Controls'
import Footer from './Components/Footer'
function App() {
  return (
    <div className="main-wrapper">
       <div className="hidden-btn blue"></div>
        <div className="app">
          <Header />
          <Input />
          <List />
          <Controls />
          <Footer />
        </div>
    </div>
  );
}

export default App;
