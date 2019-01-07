const path = require('path');
const fs = require('fs');
const solc = require('solc');
const campaignPath = path.resolve( __dirname , 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            'content': source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {interface: output.contracts['Campaign.sol'].Campaign.abi, bytecode: output.contracts['Campaign.sol'].Campaign.evm.bytecode.object};