import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Board.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddCard from "../AddCard/AddCard"



function Board() {
  const [list, setList] = useState([]);

  const getAllData = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/board`)
      .then(response => {
        setList(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }
 
  useEffect(() => {
    getAllData()
  },[])
  const onDragEnd = (result, list , setList)=>{
      if(!result.destination) return
      const {source , destination} = result

      if(source.droppableId !== destination.droppableId){
        const sourceCol = list[source.droppableId]
        const destCol = list[destination.droppableId]
        const sourceItems = [...sourceCol.cards]
        const destItems = [...destCol.cards]
        const [removed] = sourceItems.splice(source.index,1)
        destItems.splice(destination.index,0,removed)
        setList({
          ...list,
          [source.droppableId]:{
            ...sourceCol,
            cards: sourceItems
          },
          [destination.droppableId]:{
            ...destCol,
            cards: destItems
          }
        })
      }
      else{
        const columns = list[source.droppableId]
        const _items = [...columns.cards]
        const [removed] = _items.splice(source.index,1)
        _items.splice(destination.index,0,removed)
        setList({
          ...list,
          [source.droppableId]:{
            ...columns,
            cards: _items
          }
        })
      }
  }
  return (
    <div>
      <div className='top'>
        <div>
          <h1 className='board-title'>Roadmop</h1>
          <span className='board-text'>By Isaac N.C. Visit website</span>
        </div>
        <div className='add-task'>
          <AddCard/>
        </div>
      </div>
      <DragDropContext onDragEnd={(result) => {onDragEnd(result,list,setList)}}>
        {Object.entries(list).map(([id,col], index) =>{
          return (
            <div key={index}>
                <div className='container'>
                  <h1>{col.title}</h1>
                  <Droppable droppableId={id} key={id}>
                    {(provider) => {
                      return(
                        <div {...provider.droppableProps} ref={provider.innerRef}>
                          {col.cards.map((item,index) => {
                            return(
                              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provider) => {
                                  return(
                                    <div className='card-container' ref={provider.innerRef}
                                    {...provider.dragHandleProps}
                                    {...provider.draggableProps}>
                                      <p>{item.taskTitle}</p>
                                      <p>{item.taskDescription}</p>
                                    </div>
                                  )
                                }}

                              </Draggable>
                            )
                          })}
                          {provider.placeholder}
                        </div>
                      )
                    }}

                  </Droppable>
                </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>

  )
}

export default Board
