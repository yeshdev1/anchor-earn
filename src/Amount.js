import './Main.css';
import { roundToTwo } from './utils';

//by default the currency is UST
export default ({
    amount = 0,
    currency = "UST",
    apy=0
}) => {
    const totalYearExpectedInterest = amount + (amount * apy);
    return (
        <div className="amount">
            <span>
                {roundToTwo(totalYearExpectedInterest)} <span className="currency">{currency}</span>
            </span>
        </div>
    )
}