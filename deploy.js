const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const campaignInterface = require('./compile').campaignData.interface;
const campaignBytecode = require('./compile').campaignData.bytecode;

const proxyInterface = require('./compile').proxyData.interface;
const proxyBytecode = require('./compile').proxyData.bytecode;

const simoleonInterface = require('./compile').simoleonData.interface;
const simoleonBytecode = require('./compile').simoleonData.bytecode;


const provider = new HDWalletProvider(
    'tiger reason cross pony hockey cereal clutch roof office track pride captain',
    'https://ropsten.infura.io/v3/32dabf89368c462cb291ee0e5f39120c'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`Attempting to deploy from account ${accounts[0]}`);

    const campaignResult = await new web3.eth.Contract(campaignInterface)
        .deploy({ data: `0x${campaignBytecode}`, arguments: [300] })
        .send({ gas: '5000000', from: accounts[0] });
    const campaignAddress = campaignResult.options.address;
    console.log(`Campaign contract deployed to ${campaignResult.options.address}`);

    const proxyResult = await new web3.eth.Contract(proxyInterface)
        .deploy({ data: `0x${proxyBytecode}`, arguments: [campaignAddress] })
        .send({ gas: '5000000', from: accounts[0] });
    console.log(`Proxy contract deployed to ${proxyResult.options.address}`);

    const simoleonResult = await new web3.eth.Contract(simoleonInterface)
        .deploy({ data: `0x${simoleonBytecode}`, arguments: [] })
        .send({ gas: '5000000', from: accounts[0] });
    console.log(`Simoleon token contract deployed to ${simoleonResult.options.address}`);
}

deploy();
