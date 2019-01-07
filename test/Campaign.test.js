require('events').EventEmitter.defaultMaxListeners = 20;

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const aux = require('../compile');
const { interface, bytecode } = aux;

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    campaign = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode
        })
        .send({ from: accounts[0], gas: "5000000"});
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
        const address = "0xC1C24B4ece6059fF5f17156C952deB098E552D21";
        await campaign.methods.createRequest('proy 1', 12, address).send({ from: accounts[0], gas: "1000000" });
        const request = await campaign.methods.requests(0).call();
        console.log(request);
        assert(request);
    });

    it('can contribute', async () => {
        console.log("account: ", accounts[0]);
        await campaign.methods.contribute().send({ from: accounts[0], value: "500000000000000001" });
    });

    it('Has approvers', async () => {
        const approvers = await campaign.methods.numApprovers().call();
        assert(approvers);
    });
});