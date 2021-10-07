var keccak = require('keccak');
var parseAddress = function (value) {
    if (isTezosAddress(value)) {
        return { xtz: value };
    }
    else if (isEthereumAddress(value)) {
        return { erc: value };
    }
    throw "Invalid address.";
};
var isTezosAddress = function (address) {
    if (/^(KT||tz)[0-9a-zA-Z]{34}$/.test(address)) {
        return true;
    }
    return false;
    // check 
};
var isEthereumAddress = function (address) {
    // check if address starts with '0x'
    if (!/^(0x)[0-9a-f]{40}$/i.test(address)) {
        return false;
    }
    else if (/^(0x)[0-9a-f]{40}$/.test(address) || /^(0x)[0-9A-F]{40}$/.test(address)) {
        return true;
    }
    return isChecksumAddress(address);
};
var isChecksumAddress = function (address) {
    var stripAddress = stripHexPrefix(address).toLowerCase();
    var keccakHash = keccak('keccak256')
        .update(stripAddress)
        .digest('hex');
    for (var i = 0; i < stripAddress.length; i++) {
        var output = parseInt(keccakHash[i], 16) >= 8
            ? stripAddress[i].toUpperCase()
            : stripAddress[i];
        if (stripHexPrefix(address)[i] !== output) {
            return false;
        }
    }
    return true;
};
var stripHexPrefix = function (value) {
    return value.slice(0, 2) === '0x' ? value.slice(2) : value;
};
var test = 'KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU';
console.log(parseAddress(test));
