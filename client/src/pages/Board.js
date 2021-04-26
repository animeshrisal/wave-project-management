import React, { useState } from "react";
import { ReactSortable, Sortable } from "react-sortablejs";

const Board = (props) => {

    const changeStatus = (status) => {
        console.log(status)
    }

    const [state, setState] = useState([
        { id: 1, name: "shrek" },
        { id: 2, name: "fiona" },
      ]);

      const [state1, setState1] = useState([
        { id: 3, name: "shrek" },
        { id: 4, name: "fiona" },
      ]);

      const [state2, setState2] = useState([
        { id: 5, name: "shrek" },
        { id: 6, name: "fiona" },
      ]);

      const [state3, setState3] = useState([
        { id: 7, name: "shrek" },
        { id: 8, name: "fiona" },
      ]);

    return (
        <React.Fragment>
            <ReactSortable 
                onAdd = {() => changeStatus(1)}
                group="board"
                animation={200} 
                list={state} 
                setList={setState} >
                {state.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                onAdd = {() => changeStatus(2)}
                group="board"
                animation={200} 
                list={state1} 
                setList={setState1} >
                {state1.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                onAdd = {() => changeStatus(3)}
                group="board"
                animation={200} 
                list={state2} 
                setList={setState2} >
                {state2.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                onAdd = {() => changeStatus(4)}
                group="board"
                animation={200} 
                list={state3} 
                setList={setState3} >
                {state3.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
        </React.Fragment>    
    )
}

export default Board