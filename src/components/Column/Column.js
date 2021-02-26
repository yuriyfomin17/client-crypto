import React from "react";
import {v4 as uuidv4} from 'uuid';
import {getList} from "../../redux/createAction";
import {connect} from "react-redux";
import {features} from "../../utils/priority";
import Task from "../Task/Task";


function Column(props) {
    const {cryptoArray, arrayInfo} = props
    return (
        <>
            <center> {props.feature}</center>
            <div className="-black-tie shadow task bg-white">

                {props.feature === features[0] ?
                    (<div className="text-container">
                            {
                                cryptoArray.map(value => (
                                    (

                                        <Task key={uuidv4()} value={value}/>
                                    )
                                ))
                            }
                        </div>
                    ) : (
                        <div className="text-container">
                            {
                                arrayInfo.map(value => (
                                    (
                                        <Task key={uuidv4()} value={value}/>
                                    )
                                ))
                            }
                        </div>
                    )
                }
            </div>


        </>

    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Column);
