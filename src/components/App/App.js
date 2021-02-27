import React, {useState} from 'react';
import Board from "../Board/Board"
import CreateTaskForm from "../ApiModalWindow/ApiModalWindow";
import "./App.css"
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import SocketModalWindow from "../SocketModalWindow/SocketModalWindow";
import axios from "axios";
import {connect} from "react-redux";
import io from "socket.io-client";
import {host} from "../../utils/utils";

function App(props, shouldRepeat = shouldRepeat) {
    const [isCreateTaskMode, setCreateTaskMode] = useState(false);
    const [isSocketModal, setSocketModel] = useState(false);
    const [indexDB, setIndexDB] = useState(false)


    const [requestCryptoArray, setRequestCryptoArrayApp] = useState([])
    const [requestPrice, setRequestPriceApp] = useState('')


    const onClickCreateTask = () => {
        setCreateTaskMode(true);
    };
    const onClickSocketModal = () => {
        setSocketModel(true);
        setIndexDB(false)
    };
    const retrieveDataFromMongo = async () => {
        await axios({
            url: 'http://localhost:5000/crypto/getAll',
            method: 'GET',
        })
            .then(res => {
                props.getFullList(res.data, requestPrice)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const callSocket = async () => {

        const urlRequest = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${requestCryptoArray.join(',')}&tsyms=${requestPrice}`;
        setRequestCryptoArrayApp(requestCryptoArray)
        setRequestPriceApp(requestPrice)
        const socket = io(host, {transports: ['websocket']});
        socket.emit('CRYPTO_GET_DATABSE', {
            request: "GET CRYPTO",
            urlRequest: urlRequest,
            cryptoAndCurrencyArray: requestCryptoArray,
            requestPrice: requestPrice

        })
        socket.on('CRYPTO_GOT_FROM_DATABSE', (dataFromDB) => {
            console.log('CRYPTO_GOT_FROM_DATABSE', dataFromDB)

        })
        setIndexDB(true)
        setSocketModel(false);

    }

    return (
        <div className="App">
            <div className="createTaskForm">
                <CreateTaskForm isCreateTaskMode={isCreateTaskMode} setCreateTaskMode={setCreateTaskMode}/>
            </div>
            <Board/>
            <button className="btn btn-light m-3" onClick={onClickCreateTask}>Set Currencies (API call)</button>

            <div className="createTaskForm">
                <SocketModalWindow isSocketModal={isSocketModal}
                                   setIndexDB={setIndexDB}
                                   setSocketModel={setSocketModel}
                                   setRequestCryptoArrayApp={setRequestCryptoArrayApp}
                                   setRequestPriceApp={setRequestPriceApp}
                                   indexDB={indexDB}

                />
            </div>
            <button className="btn btn-light m-3"
                    onClick={onClickSocketModal}>Configure DB Parameters (SOCKET)
            </button>
            {indexDB && (<button className="btn btn-light m-3"
                                 onClick={retrieveDataFromMongo}>Retrieve Data From Mongo DB
            </button>)}
            {indexDB && (<h2>Data was fetched to MongoDB. Next call to API will be made in</h2>)}
            {(indexDB) && (<CountdownCircleTimer
                isPlaying
                duration={60}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                onComplete={() => [true, 0, callSocket()]}

            >
                {({remainingTime}) => remainingTime}
            </CountdownCircleTimer>)}
        </div>
    );
}

const mapStateToProps = (state) => ({
    store: state
});


const mapDispatchToProps = (dispatch) => ({

    getFullList: (data, requestPrice) => dispatch({type: "GET_CRYPTO_PRICE_SOCKET", payload: data, requestPrice}),

});
export default connect(mapStateToProps, mapDispatchToProps)(App);
