import axios from 'axios';

export function getList(urlRequest) {

    return (dispatch) => {
        axios({
            url: urlRequest,
            method: 'GET',
        })
            .then(res => {
                dispatch({
                    type: 'GET_CRYPTO_PRICE', payload: res.data['DISPLAY']
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}
