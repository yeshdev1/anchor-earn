import { Account, AnchorEarn, MnemonicKey, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';
const mnemonicKey = 'kidney cannon silk dust tube flight trophy approve identify kind purse install proud kind pigeon bleak this clever mosquito change cash mango sample prepare'

//closure to get all the function instances to fire the each of the actions associated with the protocols
 export const protocolActions = () => {    
    //function to create a completely new account
    const createNewAccount = () => {
        return new Account(CHAINS.TERRA).toData();
    }

    // abstracting the common parts of the code out of the inner methods with specific functions
    const account = new MnemonicKey({
        mnemonic: mnemonicKey
    });

    const anchorEarn = new AnchorEarn({
        chain: CHAINS.TERRA,
        network: NETWORKS.BOMBAY_12,
        privateKey: account.privateKey,
        address: account.accAddress
    });

    const deposit = async (
        amount
    ) => {    
        const deposit = await anchorEarn.deposit({
            amount: amount,
            currency: DENOMS.UST,
        });
        return deposit.toData()
    }

    const withdraw = async (
        amount
    ) => {
        const withdraw = await anchorEarn.withdraw({
            amount: amount,
            currency: DENOMS.UST,
        });
        return withdraw.toData()
    }

    const send = async (
        receiver,
        amount
    ) => {
        const sendUst = await anchorEarn.send({
            currency: DENOMS.UST,
            recipient: receiver,
            amount: amount,
        });
        return sendUst.toData()
    }

    const balance = async () => {
        const userBalance = await anchorEarn.balance({
            currencies: [DENOMS.UST],
        });
        return userBalance.toData()
    }

    const market = async () => {
        const market = await anchorEarn.market({
            currencies: [DENOMS.UST],
        });

        return market.toData()
    }

    return {
        createNewAccount,
        deposit,
        withdraw,
        send,
        balance,
        market
    }
}
