import React from 'react'
import DragSort from './index.js'
import { styles } from './index.less'

export default class DragSortExample extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        list: [{name: 'title'},{name: 'name'},{name: 'code'},{name: 'email'}],
        curMoveItem: null,
        index: '',
        dragged: false
      }
  }

  handleDragMove = (data, from, to) => {
    this.setState({
      curMoveItem: to,
      list: data,
      index: null
    })
  }

  handleDragEnd = (index)=>{
    console.log(index)
    this.setState({
      curMoveItem: null,
      dragged: false,
      index
    })
  }
  
  enter = (index) => {
    if(this.state.index !== null) {
       console.log(121212)
      this.setState({
        index
      })
    }
  }
  
  leave = () => {
    if(this.state.index !== null) {
      this.setState({
        index: ''
      })
    }
  }

  render() {
      const { dragged } = this.state;
      const el = this.state.list.map((item, index) =>{
        return (
          <div 
            className={this.state.curMoveItem === index ? 'item active' : 'item'}
            //data-index={index}
            onMouseEnter={this.enter.bind(this, index)}
            onMouseLeave={this.leave.bind(this, index)}
            style={{ 
              background: this.state.index === index ? 'red' : '#eee',
              //background: 
            }}
            key={item.name}>
            <div className="inner">{item.name}</div>
          </div>
        )
      })
      return (
          <div>
              <ul>
                <DragSort 
                  onDragEnd={this.handleDragEnd} 
                  onDragMove={this.handleDragMove}
                  draggable={true} 
                  data={this.state.list}>
                    {el}
                </DragSort>
              </ul>
          </div>
      )
  }
}