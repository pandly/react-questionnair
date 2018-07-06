import React from 'react'

let curDragIndex = null;

export default function DragSort(props){
    let container = props.children;
    let draggable = props.draggable;
    function onChange(from, to){
      //if(from === to ) return ;
      let curValue = props.data;
      let newValue = arrMove(curValue, from, to);
      if(typeof props.onDragMove === 'function'){
        return props.onDragMove(newValue, from ,to);
      }
    } 
    return <div>
      {container.map((item, index)=>{
      if(React.isValidElement(item)){
        return React.cloneElement(item, {
          draggable,
          //开始拖动元素时触发此事件 
          onDragStart(){
            curDragIndex = index
          },
          /*
           * 当被拖动的对象进入其容器范围内时触发此事件
           * 在自身拖动时也会触发该事件
           */
          onDragEnter() {
            onChange(curDragIndex, index)
            curDragIndex = index;
          },
          /* 
           * 当被拖动的对象在另一对象容器范围内拖动时触发此事件
           * 在拖动元素时，每隔350毫秒会触发onDragOver事件
           */
          onDragOver(e) {
            /*
             * 默认情况下，数据/元素不能放置到其他元素中。如果要实现该功能，我们需要
             * 防止元素的默认处理方法，我们可以通过调用event.preventDefault()方法来实现onDragOver事件
             */
            e.preventDefault();
          },
          //完成元素拖动后触发
          onDragEnd(){
            curDragIndex = null;
            if(typeof props.onDragEnd === 'function'){
              props.onDragEnd(index)
            }
          }
        })
      }
      return item;
    })}
    </div>;
}

function arrMove(arr, fromIndex, toIndex){
  if(fromIndex !== toIndex) {
    arr = arr.concat();
    let item = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex , 0, item);
  }
  return arr;
}