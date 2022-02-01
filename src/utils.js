

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

export const roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}