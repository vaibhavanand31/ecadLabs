interface EthereumAddress {
	erc20: string
}

interface TezosAddress {
	xtz20: string
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
