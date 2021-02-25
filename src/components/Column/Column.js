import React, {useState} from "react";
import Task from "../Task/Task";
import {v4 as uuidv4} from 'uuid';
import {getList} from "../../redux/createAction";
import {connect} from "react-redux";


function Column(props) {
    const data = props.store
    const shortCode = props.feature.split(" ").join("")
    const arrayInfo = []


    return (
        <div className="text">
            <center> {props.feature}</center>
            {arrayInfo.map((value, index) =>
                (
                    <Task key={uuidv4()} element={value}/>
                )
            )}

        </div>
    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Column);
