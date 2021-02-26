import {cryptoCurrencies, priceSymbols, features} from "../utils/priority";


let initialState = {
    0: [],
};

// const obj = {};
// obj['fsyms'] = fsyms;
// obj['tsyms'] = tsyms;
// obj['CHANGE24HOUR'] = response.data['DISPLAY'][fsyms][tsyms]['CHANGE24HOUR'];
// obj['OPEN24HOUR'] = response.data['DISPLAY'][fsyms][tsyms]['OPEN24HOUR'];
// obj['VOLUME24HOUR'] = response.data['DISPLAY'][fsyms][tsyms]['VOLUME24HOUR'];
// obj['VOLUME24HOURTO'] = response.data['DISPLAY'][fsyms][tsyms]['VOLUME24HOURTO'];
// obj['LOW24HOUR'] = response.data['DISPLAY'][fsyms][tsyms]['LOW24HOUR'];
// obj['HIGH24HOUR'] = response.data['DISPLAY'][fsyms][tsyms]['HIGH24HOUR'];
// obj['PRICE'] = response.data['DISPLAY'][fsyms][tsyms]['PRICE'];
// obj['SUPPLY'] = response.data['DISPLAY'][fsyms][tsyms]['SUPPLY'];
// obj['MKTCAP'] = response.data['DISPLAY'][fsyms][tsyms]['MKTCAP'];

const crypto = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CRYPTO_PRICE':
            console.log(action.payload)
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


        case "GET_CRYPTO_PRICE_DATABASE":
            return initialState

        default:
            return state


    }

}

export default crypto
