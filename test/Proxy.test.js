require('events').EventEmitter.defaultMaxListeners = 20;

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const campaignInterface = require('../compile').campaignData.interface;
const campaignBytecode = require('../compile').campaignData.bytecode;
const proxyInterface = require('../compile').proxyData.interface;
const proxyBytecode = require('../compile').proxyData.bytecode;

let accounts;
let campaign;
let proxy;
let campaignAddress;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaign = await new web3.eth.Contract(campaignInterface)
    .deploy({ data: `0x${campaignBytecode}`, arguments: [300] })
    .send({ gas: '5000000', from: accounts[0] });
    campaignAddress = campaign.options.address;

    proxy = await new web3.eth.Contract(proxyInterface)
    .deploy({ data: `0x${proxyBytecode}`, arguments: [campaignAddress] })
    .send({ gas: '5000000', from: accounts[0] });
});

describe('Proxy', () =>{
    it('Deploys a contract', () => {
        assert.ok(proxy.options.address);
    });

    it('Has manager', async () => {
        const manager = await proxy.methods.manager().call();
        assert(manager);
    });


    it('Campaign address is correct', async () => {
        const address = await proxy.methods.getProxyAddress().call();
        assert.equal(address, campaignAddress);
    });

    it('Can set a new address', async () => {
        await proxy.methods.setProxyAddress('0x5616aec77e534e414B081945b72E27A7B82636f').call();
        const address = await proxy.methods.getProxyAddress().call();
        assert.equal(address, '0x5616aec77e534e414B081945b72E27A7B82636f');
    });
});