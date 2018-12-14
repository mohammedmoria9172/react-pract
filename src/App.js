import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listField: '',
      listData: [],
      addAnim: ''
    }
    this.saveList = this.saveList.bind(this)
    this.submitList = this.submitList.bind(this)
    this.renderList = this.renderList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.cmpltdTask = this.cmpltdTask.bind(this)
  }

  saveList(e) {
    this.setState({
      listField: e.target.value
    })
  }

  submitList(e) {
    e.preventDefault()
    if (this.state.listField.length) {
      this.state.listData.push(this.state.listField)  //if we use unsift instead of push then it will push ele at the start of array
      this.setState({
        listField: '',
        addAnim: 'addanim'
      })
    } else {
      alert('Field is empty')
    }
  }

  deleteList(item, index, e) {
    let { listData } = this.state;
    listData.splice(index, 1);  // return the array after deleted element, splice(start,delete count,ele); start= starting point in current array,  delete count = number of elements you want to delete, ele = element you wanted to insert  
    this.setState({
      listData
    })
  }

  cmpltdTask(e) {
    let cmpltChildEle = e.target;
    let cmpltparentEle = cmpltChildEle.parentElement.parentElement;
    cmpltparentEle.className += ' cmptld-list';
  }

  renderList() {
    const { listData, addAnim } = this.state;
    if (listData.length) {
      return (
        <div className="todo-list">
          <ul>
            {listData.map((item, index) => {
              return <li key={index} className={`ll-todo ${addAnim}`}><span className="todo-data">{item}</span><span className="td-icon cmplt-todo" onClick={(e) => this.cmpltdTask(e)}><i className="fas fa-check"></i></span><span className="td-icon del-todo" onClick={(e) => this.deleteList(item, index, e)}><i className="fas fa-times"></i></span></li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div className="todo-list no-data">
          <p>No Todo's Today</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="todo-container">
        <div className="todo-inner-cont">
          <div className="todo-title"><h1><span className="owner-name">Mohammed's</span> Todo App</h1></div>
          <div className="todo-ip">
            <input type="text" placeholder="Enter Your Todo" value={this.state.listField} onChange={(e) => this.saveList(e)} />
            <button onClick={(e) => this.submitList(e)} >Submit</button>
          </div>
          {this.renderList()}
        </div>
      </div>
    )
  }
}

export default App;
