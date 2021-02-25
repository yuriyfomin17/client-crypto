import React, {useEffect} from 'react';

import {v4 as uuidv4} from 'uuid';
import Column from "../Column/Column";
import {cryptoCurrencies, features} from "../../utils/priority"
import {connect} from "react-redux";
import "./Board.css"


function Board(props) {
    const {getFullList} = props
    const data = props.store

    const cryptoInfo = []
    const arrayInfo = []

    useEffect(() => {
        getFullList()


    }, [getFullList]);


    cryptoCurrencies.map(crypto => {
        if (data[crypto]) {
            cryptoInfo.push(crypto)
            data[crypto].map((element, index) => {
                if (index !== 0) {
                    arrayInfo.push(element[1])
                }

            })
        }
    })
    console.log("cryptoInfo", cryptoInfo)

    console.log("arrayInfo", arrayInfo)

    return (
        <div className="board">
            {

                features.map((feature, index) => {
                    return (
                        <div className="status-col">

                            <Column key={uuidv4()}
                                    feature={feature}
                                    arrayInfo={arrayInfo.length !== 0 ? arrayInfo : null}
                            />
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
    getFullList: () => dispatch({type: "GET_STATE"}),

});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
