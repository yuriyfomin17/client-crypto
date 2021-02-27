import {cryptoCurrencies, priceSymbols, features} from "../utils/utils";


let initialState = {
    0: [],
};

const crypto = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CRYPTO_PRICE':
            if (action.payload === undefined) {
                initialState = {}
                return {}
            }
            console.log("ACTION PAYLOAD", action.payload)
            const obj = {}
            for (let i = 0; i < cryptoCurrencies.length; i++) {
                const crypto = cryptoCurrencies[i];
                if (action.payload[crypto]) {
                    obj[crypto] = []
                }
                for (let k = 0; k < priceSymbols.length; k++) {
                    const priceSymbol = priceSymbols[k]
                    if (action.payload[crypto] && action.payload[crypto][priceSymbol]) {
                        for (let n = 1; n < features.length; n++) {
                            const currString = features[n].split(" ").join("")
                            const currObj = []
                            currObj.push(currString)
                            currObj.push(action.payload[crypto][priceSymbol][currString])
                            obj[crypto].push(currObj)
                        }
                    }
                }
            }
            initialState = obj
            return obj

        case 'GET_CRYPTO_PRICE_SOCKET':
            const {payload} = action
            const objSocket = {}
            for (let k = 0; k < payload.length; k++) {
                const [currCrypto] = payload[k]["arrayInfo"]
                for (let i = 0; i < cryptoCurrencies.length; i++) {

                    const crypto = cryptoCurrencies[i];
                    if (currCrypto["fsyms"] === crypto) {

                        objSocket[crypto] = []

                        for (let n = 1; n < features.length; n++) {
                            const currString = features[n].split(" ").join("")
                            const currObj = []
                            currObj.push(currString)
                            currObj.push(currCrypto[currString])
                            objSocket[crypto].push(currObj)
                        }
                    }


                }
            }

            initialState = objSocket
            return objSocket


        case "NULL_STATE":
            initialState = {}
            return {}

        default:
            return state


    }

}

export default crypto
