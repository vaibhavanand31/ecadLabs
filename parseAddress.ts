interface EthereumAddress {
	
}

interface TezosAddress {

}

type Address = EthereumAddress | TezosAddress

const parseAddress = (value: string) : Address => {
	try {
        const address = JSON.parse(value) as Address
        return address
    } catch (error) {
        throw "Unable to parse"
    }
}