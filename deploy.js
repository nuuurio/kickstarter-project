const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile.js');

const provider = new HDWalletProvider(
    'tiger reason cross pony hockey cereal clutch roof office track pride captain',
    'https://ropsten.infura.io/v3/32dabf89368c462cb291ee0e5f39120c'
);
const web3 = new Web3(provider );

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account ${accounts[0]}`);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [30]})
        .send({gas: '1000000', from: accounts[0]});
    console.log(`Contract deployed to ${result.options.address}`);

};

deploy();
