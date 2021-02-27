import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import Column from "../Column/Column";
import {cryptoCurrencies, features} from "../../utils/utils"
import {connect} from "react-redux";
import "./Board.css"


function Board(props) {
    const {getFullList} = props
    const data = props.store

    const cryptoInfo = []
    const objInfo = {}

    useEffect(() => {
        getFullList()


    }, [getFullList]);


    cryptoCurrencies.map((crypto) => {
        if (data[crypto]) {
            cryptoInfo.push(crypto)
        }
        return ''
    })
    features.map((feature, index) => {
        if (index !== 0) {
            let currShortCode = feature.split(" ").join("")
            if (objInfo[currShortCode] === undefined) {
                objInfo[currShortCode] = []
                cryptoInfo.map(crypto => {
                    const [featureElement] = data[crypto].filter(el => el[0] === currShortCode)
                    // console.log("FEATURE ELEMENT", featureElement)
                    objInfo[featureElement[0]].push(featureElement[1])
                    return ''
                })
            } else {
                cryptoInfo.map(crypto => {
                    const featureElement = data[crypto].filter(el => el[0] === currShortCode)
                    // console.log("FEATURE ELEMENT", featureElement)
                    objInfo[featureElement[0]].push(featureElement[1])
                    return ''
                })
            }
        }
        return ''

    })
    useEffect(() => {
        getFullList()

    }, [getFullList]);

    return (
        <table className="board">
            {

                features.map((feature, index) => {
                    return (
                        <tr key={uuidv4()} className="status-col">

                            <Column key={uuidv4()}
                                    feature={feature}
                                    cryptoArray={cryptoInfo}
                                    arrayInfo={objInfo[feature.split(" ").join("")]}
                            />
                        </tr>
                    )
                })


            }
        </table>
    );
}


const mapStateToProps = (state) => ({
    store: state
});


const mapDispatchToProps = (dispatch) => ({

    getFullList: () => dispatch({type: "GET_STATE"}),

});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
