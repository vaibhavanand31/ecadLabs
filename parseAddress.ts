const keccak = require('keccak')

interface EthereumAddress {
    erc: string
}

interface TezosAddress {
    xtz: string
}

type Address = EthereumAddress | TezosAddress

const parseAddress = (value: string) : Address => {
    if (isTezosAddress(value)) {
        return { xtz: value }
    } else if (isEthereumAddress(value)) {
        return { erc: value }
    }
    throw "Invalid address."
}

const isTezosAddress = (address: string) : boolean => {
    if (/^(KT||tz)[0-9a-ZA-Z]{34}$/.test(address)) {
        return true
    }
}

const isEthereumAddress = (address: string) : boolean => {
    // check if address starts with '0x'
    if (!/^(0x)[0-9a-f]{40}$/i.test(address)) {
        return false
    } else if (/^(0x)[0-9a-f]{40}$/.test(address) || /^(0x)[0-9A-F]{40}$/.test(address)) {
        return true
    }
    return isChecksumAddress(address)
}

const isChecksumAddress = (address: string): boolean => {
    const stripAddress = stripHexPrefix(address).toLowerCase()
    const keccakHash = keccak('keccak256')
        .update(stripAddress)
        .digest('hex')
  
    for (let i = 0; i < stripAddress.length; i++) {
        let output =
            parseInt(keccakHash[i], 16) >= 8
            ? stripAddress[i].toUpperCase()
            : stripAddress[i]
        if (stripHexPrefix(address)[i] !== output) {
            return false
        }
    }
    return true
}

const stripHexPrefix = (value: string): string => {
    return value.slice(0, 2) === '0x' ? value.slice(2) : value
}

const test = '0xf7c07d7E9ef7eC247AaF5D3811f7c3493da3f21E'

console.log(parseAddress(test))
