import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {priceCurrencies, cryptoCurrencies} from "../../utils/priority";
import {connect} from "react-redux";
import axios from 'axios';
import {getList} from "../../redux/createAction";


function CreateTaskForm(props) {
    const cssCryptoNotActive = "list-group-item list-group-item-action"
    const cssCryptoActive = "list-group-item list-group-item-action active"
    const {isCreateTaskMode, setCreateTaskMode} = props;
    const [price, setPrice] = useState(priceCurrencies[0]);
    const [cryptoCss, setCSSCrypto] = useState(new Array(8).fill(cssCryptoNotActive))

    const setCryptoCSS = (index) => {
        const copyCSS = cryptoCss.slice()
        if (copyCSS[index] === cssCryptoActive) {
            copyCSS[index] = cssCryptoNotActive
        } else {
            copyCSS[index] = cssCryptoActive
        }
        setCSSCrypto(copyCSS)
    }
    const onCancel = () => {
        setCreateTaskMode(false);

    }

    const addNewTask = async () => {
        await axios({
            url: 'http://localhost:5000/todo/create',
            method: 'POST',
            data: {

                priority: price,
                shrink: false,
                done: false
            },
        })
            .then(res => {
                props.getFullList()
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
                            onChange={(e) => setPrice(e.target.value)}
                    >
                        {
                            priceCurrencies.map((priority) => {
                                return <option key={priority} value={priority}>{priority}</option>;
                            })
                        }
                    </select>
                </div>
                <div className="list-group">
                    <label htmlFor="crypto">Choose Crypto Currency</label>
                    {cryptoCurrencies.map((crypto, index) => {
                        return <a className={cryptoCss[index]} onClick={() => setCryptoCSS(index)}> {crypto}</a>
                    })}
                </div>
                <button className="btn btn-secondary float-right ml-2" onClick={onCancel}>Cancel
                </button>
                <button className="btn btn-primary float-right" onClick={addNewTask}>Save</button>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    store: state
});
const mapDispatchToProps = (dispatch) => ({
    getFullList: () => dispatch(getList()),

});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
