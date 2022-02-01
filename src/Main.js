import MainHeader from './MainHeader';
import './Main.css';
import DisplayTile from './DisplayTile';
import Amount from './Amount'
import ActionTile from './ActionTile';
import Interest from './Interest';

export default ({
    section = "EARN",
    deposit=0,
    account=0,
    currency="",
    apy=0,
    getRetrieveBalance
}) => {
    if (deposit === -1) {
        return (
            <div className="loading">
                LOADING
            </div>
        )
    }
    return (
        <div className="main">
            <MainHeader title={section} />
            <DisplayTile heading={"TOTAL DEPOST"}>
                <Amount amount={deposit} currency={currency} />
                <ActionTile getRetrieveBalance={getRetrieveBalance} withdrawAmount={account} depositAmount={deposit} />
            </DisplayTile>
            <DisplayTile heading={"INTEREST"}>
                <Interest apy={apy} />
            </DisplayTile>
            <DisplayTile heading={"EXPECTED INTEREST"}>
                <Amount amount={deposit} currency={currency} apy={apy} />
            </DisplayTile>
        </div>
    )
}