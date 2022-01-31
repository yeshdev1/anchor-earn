
import './Main.css';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { protocolActions } from 'api';
import { chooseAction } from './utils';

const sendRequestToProtocol = (
    setConfirmationInformation,
    setLoadingConfirmation,
    action,
    totalAmonut,
    type
) => {
    action(totalAmonut).then(res => {
        setConfirmationInformation(prevState => {
            return {
                ...prevState,
                type: type,
                amount: res.amount,
                tx_fee: res.tx_fee,
                tx_hash: res.tx_details[0].txHash
            }
        })
        setLoadingConfirmation(false);
    }).catch(error => console.log(error))
}

const ActionsModal = ({
    show,
    header,
    maxAmount = 0,
    fee = "unknown",
    amountType = "Send Amount",
    closeModal
}) => {
    const [totalAmonut, setTotalAmount] = useState(null);
    const [confirmationInformation, setConfirmationInformation] = useState({});
    const [loading, setLoadingConfirmation] = useState(false);

    const executeAction = (actionType) => {
        const actions = protocolActions();
        const action = chooseAction(actionType, actions);
        sendRequestToProtocol(setConfirmationInformation, setLoadingConfirmation, action, totalAmonut, actionType)
        setLoadingConfirmation(true);
    }

    if (loading) {
        return (
            <Modal show={show}>
                <div className="loading">
                    LOADING
                </div>
            </Modal>
        )
    }

    if (Object.keys(confirmationInformation).length !== 0) {
        return (
            <>
               <ConfirmationModal
                type={confirmationInformation.type + " Amount"}
                amount={confirmationInformation.amount}
                tx_fee={confirmationInformation.tx_fee}
                tx_hash={confirmationInformation.tx_hash}
                show={show}
                closeModal={closeModal}
               /> 
            </>
        )
    }

    return (
        <Modal show={show} handleClose={closeModal}>
            <div className="action-heading">
                {header}
            </div>
            <div className="margin-input">
                <div className="float-container">
                    <label for="input">AMOUNT</label>
                    <input type="text" value={totalAmonut} onChange={(e) => setTotalAmount(e.target.value)} />
                    <label for="input" className="currency">UST</label>
                </div>
                <div className="max">Max:{maxAmount} UST</div>
            </div>
            {totalAmonut && totalAmonut > 0 &&
                <div className="summary">
                    <div className="costs">
                        <span>tx fee</span>
                        <span>{fee}</span>
                    </div>
                    <div className="costs">
                        <span>{amountType}</span>
                        <span>{totalAmonut}</span>
                    </div>
                    <button className="actionButtons proceed" onClick={() => executeAction(header)}>
                        Proceed
                    </button>
                </div>
            }
        </Modal>
    )
}

const ConfirmationModal = ({
    type,
    amount,
    tx_hash,
    tx_fee,
    show,
    closeModal
}) => {
    return (
        <Modal show={show} handleClose={closeModal}>
            <div className="summary">
                <div className="complete">
                    Complete
                </div>
                <hr />
                <div className="costs">
                    <span>{type}</span>
                    <span>{amount}</span>
                </div>
                <div className="costs">
                    <span>tx fee</span>
                    <span>{tx_fee}</span>
                </div>
                <div className="costs">
                    <span>tx hash</span>
                    <span>{tx_hash}</span>
                </div>
                <button className="actionButtons proceed" onClick={closeModal}>
                    Close
                </button>
            </div>
        </Modal>
    )
}

export default ({
    getRetrieveBalance,
    depositAmount,
    withdrawAmount
}) => {
    const [modalStatus, toggleModalStatus] = useState([false, null]);
    const close = () => {
        toggleModalStatus([false,null])
        getRetrieveBalance(true)
    }

    return (
        <div className="amount actions">
            <button className="actionButtons deposit-color" onClick={() => toggleModalStatus(prevState => { return [true, "deposit"] })}>
                Deposit
            </button>
            <button className="actionButtons withdraw-color" onClick={() => toggleModalStatus(prevState => { return [true, "withdraw"] })}>
                Withdraw
            </button>
            {modalStatus[0] && modalStatus[1] === 'deposit' && <ActionsModal show={modalStatus[0]} closeModal={close} header={"Deposit"} amountType="Send Amount" maxAmount={withdrawAmount} />}
            {modalStatus[0] && modalStatus[1] === 'withdraw' && <ActionsModal show={modalStatus[0]}  closeModal={close} header={"Withdraw"} amountType="Recieve Amount" maxAmount={depositAmount}  />}
        </div>
    )
}