import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {priceCurrencies, cryptoCurrencies, priceSymbols} from "../../utils/priority";
import {connect} from "react-redux";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';


function CreateTaskForm(props) {

    const cssCryptoNotActive = "list-group-item list-group-item-action"
    const cssCryptoActive = "list-group-item list-group-item-action active"
    const {isCreateTaskMode, setCreateTaskMode} = props;
    const [price, setPrice] = useState(priceCurrencies[0]);
    const [cryptoCss, setCSSCrypto] = useState(["list-group-item list-group-item-action active",...new Array(7).fill(cssCryptoNotActive)])

    const [requestCryptoArray, setCryptoRequest] = useState(["BTC"])
    const [requestPrice, setRequestPrice] = useState(priceSymbols[0])


    const setCryptoCSS = (crypto, index) => {
        const copyCSS = cryptoCss.slice()
        const copyRequestCryptoArray = requestCryptoArray.slice()

        if (copyCSS[index] === cssCryptoActive) {
            copyCSS[index] = cssCryptoNotActive
        } else {
            copyCSS[index] = cssCryptoActive
        }

        if (copyRequestCryptoArray.includes(crypto)) {
            const index = copyRequestCryptoArray.indexOf(crypto)
            copyRequestCryptoArray.splice(index, 1)
        } else {
            copyRequestCryptoArray.push(crypto)
        }
        setCryptoRequest(copyRequestCryptoArray)
        setCSSCrypto(copyCSS)

    }
    const setPriceRequest = (event) => {
        setPrice(event.target.value)
        const index = priceCurrencies.indexOf(event.target.value)
        setRequestPrice(priceSymbols[index])

    }
    const onCancel = () => {
        setCreateTaskMode(false);

    }

    const setCurrencies = async () => {
        const urlRequest = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${requestCryptoArray.join(',')}&tsyms=${requestPrice}`;
        console.log("URL", urlRequest)
        await axios({
            url: urlRequest,
            method: 'GET',
        })
            .then(res => {
                console.log("SUCCESS API CALL")
                props.getFullList(res.data['DISPLAY'])
            })
            .catch(error => {
                console.log(error)
            })
        setCreateTaskMode(false);
    }
    return (
        <Modal show={isCreateTaskMode} onHide={onCancel} centered>
            <div className="p-3">
                <h4>Set Table</h4>

                <div className="form-group">
                    <label htmlFor="priority">Currency Price</label>
                    <select id="priority" className="form-control" defaultValue={price}
                            onChange={(e) => setPriceRequest(e)}
                    >
                        {
                            priceCurrencies.map((price) => {
                                return <option key={uuidv4()} value={price}>{price}</option>;
                            })
                        }
                    </select>
                </div>
                <div className="list-group">
                    <label htmlFor="crypto">Choose CryptoCurrencies</label>
                    {cryptoCurrencies.map((crypto, index) => {
                        return <button key={uuidv4()} className={cryptoCss[index]} onClick={() => setCryptoCSS(crypto, index)}> {crypto}</button>
                    })}
                </div>
                <br/>
                <button className="btn btn-secondary float-right ml-2" onClick={onCancel}>Cancel
                </button>
                <button className="btn btn-primary float-right" onClick={setCurrencies}>Save</button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: (data) => dispatch({ type: 'GET_CRYPTO_PRICE', payload: data }),

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
