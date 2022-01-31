import './Main.css';

export default ({ title }) => {
    return (
        <div className="mainHeader">
            <h1>
                Earn
                <a href="https://docs.anchorprotocol.com/user-guide/webapp/earn" target="anchor-docs" rel="noreferrer">
                    Docs
                </a>
            </h1>
            <div className="miscActions">
                <button className="buttons">
                    Protect Your Deposit
                </button>
                <button className="buttons">
                    Buy UST
                </button>
            </div>
        </div>
    )
}