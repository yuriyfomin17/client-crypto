import React, {useEffect} from 'react';

import {v4 as uuidv4} from 'uuid';
import Column from "../Column/Column";
import {features} from "../../utils/priority"
import {connect} from "react-redux";
import {getList} from "../../redux/createAction";
import "./Board.css"


function Board(props) {
    const {getFullList} = props


    useEffect(() => {
        getFullList()

    }, [getFullList]);


    return (
        <div className="board">
            {

                features.map((feature, index) => {
                    return (
                        <div className="status-col">

                            <Column key={uuidv4()}
                                    feature={feature} columnIndex={index}/>
                        </div>
                    )
                })


            }
        </div>
    );
}


const mapStateToProps = (state) => ({
    store: state
});


const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
    dragSameColumn: (column, indexToRemove, indexToInsert) => dispatch({
        type: 'DRAG_END_SAME_COLUMN',
        payload: {column: column, indexToRemove: indexToRemove, indexToInsert: indexToInsert}
    }),
    dragDiffColumn: (sourceColumn, destColumn, destIndex, sourceIndex) => dispatch({
        type: 'DRAG_END_DIFFERENT_COLUMN',
        payload: {sourceColumn: sourceColumn, destColumn: destColumn, destIndex: destIndex, sourceIndex: sourceIndex}
    })

});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
