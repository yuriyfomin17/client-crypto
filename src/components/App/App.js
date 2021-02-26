import React, {useEffect, useState} from 'react';
import Board from "../Board/Board"
import CreateTaskForm from "../ApiModalWindow/ApiModalWindow";
import "./App.css"
import io from "socket.io-client";

function App() {
    const [isCreateTaskMode, setCreateTaskMode] = useState(false);
    const [isSocketModal, setSocketModel] = useState(false);

    const onClickCreateTask = () => {
        setCreateTaskMode(true);
    };
    const onClickSocketModal = () => {
        setSocketModel(true);
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


    return (
        <div className="App">
            <div className="createTaskForm">
                <CreateTaskForm isCreateTaskMode={isCreateTaskMode} setCreateTaskMode={setCreateTaskMode}/>
            </div>
            <Board/>
            <button className="btn btn-light m-3" onClick={onClickCreateTask}>Set Currencies</button>

            <div className="createTaskForm">
                <CreateTaskForm isSocketModal={isSocketModal} setSocketModel={setSocketModel}/>
            </div>
            <button className="btn btn-light m-3" onClick={onClickSocketModal}>Connect Socket</button>
        </div>
    );
}

export default App;
