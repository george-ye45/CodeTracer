import React from 'react';
import './App.css';
import TopNav from './Components/TopNav/topnav'
import CodeMain from './Components/Main/code.main'

class App extends React.Component {
  

  state = {
    language: "python"
  }

  handleLangChange = (language) => {
    this.setState({ language })
  }




  render() {
    return (
      <div>
        <div style = {{height: '100%'}}>
            <TopNav actions = {{handleLangChange: this.handleLangChange}}/>
            <CodeMain language = {this.state.language}/>
        </div>
      </div>
    );

  }
}

export default App;
