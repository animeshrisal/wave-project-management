import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { ReactSortable} from "react-sortablejs";

import sprintService from "../network/sprintService";

const Board = () => {

    const changeStatus = (e, status) => {
        mutation.mutate({'taskId': e.item.dataset.id, 'taskStatus': status})
    }

    const { projectId, sprintId } = useParams()

    const mutation = useMutation((values) => sprintService.updateTaskStatus(projectId, sprintId, values));

    const { isLoading, error } = useQuery(
        ["board", projectId, sprintId],
        () => sprintService.getBoardData(projectId, sprintId),
        {
            onSuccess: (data) => {
                setState(data[1] || [])
                setState1(data[2] || [])
                setState2(data[3] || [])
                setState3(data[4] || [])
            }
        }
    );


    const [state, setState] = useState([]);
    const [state1, setState1] = useState([]);
    const [state2, setState2] = useState([]);
    const [state3, setState3] = useState([]);



    if (isLoading) return "Loading...";

    if (error) return "Error...";

    return (
        <React.Fragment>
            <ReactSortable 
                style={{padding: '50px', background: 'red'}}
                onAdd = {(e) => changeStatus(e, 1)}
                group="board"
                animation={200} 
                list={state} 
                setList={setState} >
                {state.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                style={{padding: '50px', background: 'blue'}}
                onAdd = {(e) => changeStatus(e, 2)}
                group="board"
                animation={200} 
                list={state1} 
                setList={setState1} >
                {state1.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                style={{padding: '50px', background: 'yellow'}}
                onAdd = {(e) => changeStatus(e, 3)}
                group="board"
                animation={200} 
                list={state2} 
                setList={setState2} >
                {state2.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
            <ReactSortable 
                style={{padding: '50px', background: 'purple'}}
                onAdd = {(e) => changeStatus(e, 4)}
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