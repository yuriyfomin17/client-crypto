import React, {useEffect, useState} from 'react';
import Board from "../Board/Board"
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import "./App.css"
import io from "socket.io-client";

function App() {
    const [isCreateTaskMode, setCreateTaskMode] = useState(false);
    const onClickCreateTask = () => {
        setCreateTaskMode(true);
    };

    const socketOnClick = () => {
        const socket = io("http://localhost:5000", {transports: ['websocket']});
        socket.emit('CRYPTO_GET_DATABSE',{
            request:"GET CRYPTO"
        })
        socket.on('CRYPTO_GOT_FROM_DATABSE',(dataFromDB)=>{
            console.log('CRYPTO_GOT_FROM_DATABSE',dataFromDB)
        } )
        socket.on('change',(dataFromDB)=>{
            console.log('CHANGE',dataFromDB)
        } )
    }
    useEffect(()=>{
        const socket = io("http://localhost:5000", {transports: ['websocket']});

        socket.on('change',(dataFromDB)=>{
            console.log('CHANGE',dataFromDB)
        } )
    },[])


    return (
        <div className="App">
            <div className="createTaskForm">
                <CreateTaskForm isCreateTaskMode={isCreateTaskMode} setCreateTaskMode={setCreateTaskMode}/>
            </div>
            <Board/>
            <button className="btn btn-light m-3" onClick={onClickCreateTask}>Set Currencies</button>
            <button className="btn btn-light m-3" onClick={socketOnClick}>Connect Socket</button>
        </div>
    );
}

export default App;
