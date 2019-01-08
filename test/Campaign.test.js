require('events').EventEmitter.defaultMaxListeners = 30;

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const interface = require('../compile').campaignData.interface;
const bytecode = require('../compile').campaignData.bytecode;

let accounts;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaign = await new web3.eth.Contract(interface)
    .deploy({ data: `0x${bytecode}`, arguments: [300] })
    .send({ gas: '5000000', from: accounts[0] });
});

describe('Campaign', () =>{
    it('Deploys a contract', () => {
        assert.ok(campaign.options.address);
    });

    it('Has manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert(manager);
    });

    it('Can create request', async () => {
        const address = "0xeb341aB27F9082A0091bfd6d1f5DDB9634E288d6";
        await campaign.methods.createRequest('proy 1', 12, address).send({ from: accounts[0], gas: "1000000" });
        const request = await campaign.methods.requests(0).call();
        assert(request);
    });

    it('can contribute', async () => {
        const contributed = await campaign.methods.contribute().send({ from: accounts[1], value: 600 });
        assert(contributed);
    });
});