import React, {useState} from 'react';
import Board from "../Board/Board"
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import "./App.css"


function App() {
    const [isCreateTaskMode, setCreateTaskMode] = useState(false);

    const onClickCreateTask = () => {
        setCreateTaskMode(true);
    };

    return (
        <div className="App">
            <div className="createTaskForm">
                <CreateTaskForm isCreateTaskMode={isCreateTaskMode} setCreateTaskMode={setCreateTaskMode}/>
            </div>
            <Board/>
            <button className="btn btn-light m-3" onClick={onClickCreateTask}>Set Currencies</button>
        </div>
    );
}

export default App;
