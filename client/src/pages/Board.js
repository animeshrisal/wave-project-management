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
        <div className='grid-container'>
            <div className = 'grid-item'>
                <div className = 'grid-header'>
                    Test
                </div>
                <ReactSortable 
                emptyInsertThreshold={50}
                    className='grid-body'
                    onAdd = {(e) => changeStatus(e, 1)}
                    group="board"
                    list={state} 
                    setList={setState} >
                    {state.map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>
            <div className = 'grid-item'>
                <div className = 'grid-header'>
                    Test
                </div>
                <ReactSortable 
                  className='grid-body'
                    onAdd = {(e) => changeStatus(e, 2)}
                    group="board"
                    list={state1} 
                    setList={setState1} >
                    {state1.map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>
            <div className = 'grid-item'>
                <div className = 'grid-header'>
                    Test
                </div>
                <ReactSortable 
                  className='grid-body'
                    onAdd = {(e) => changeStatus(e, 3)}
                    group="board"
                    list={state2} 
                    setList={setState2} >
                    {state2.map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>
            <div className = 'grid-item'>
                <div className = 'grid-header'>
                    Test
                </div>
                <ReactSortable 
                  className='grid-body'
                    onAdd = {(e) => changeStatus(e, 4)}
                    group="board"
                    list={state3} 
                    setList={setState3} >
                    {state3.map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </ReactSortable>
            </div>
        </div>    
    )
}

export default Board