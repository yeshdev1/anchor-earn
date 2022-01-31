

export const chooseAction = (type, actions) => {
    switch (type) {
        case "Deposit":
            return actions.deposit
        case "Withdraw":
            return actions.withdraw
        default:
            return actions.balance
    }
}