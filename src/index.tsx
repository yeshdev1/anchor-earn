import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { protocolActions } from './api';
import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';

function App() {
  //setting the balance
  const [accountBalance, setAccountBalance] = useState(-1);
  const [depositBalance, setDepositBalance] = useState(-1);
  const [marketInformation, setMarketInformation] = useState({});
  const [retrieveBalance, setRetrieveBalance] = useState(false);
  useEffect(() => {
    const actions = protocolActions()
    actions.balance().then(res => {
      setAccountBalance(parseInt(res.total_account_balance_in_ust))
      setDepositBalance(parseInt(res.total_deposit_balance_in_ust))
    })
    actions.market().then(res => {
      setMarketInformation(prevState => {
        return {
          ...prevState,
          apy: res.markets[0].APY,
          currency: res.markets[0].currency
        }
      })
    })
  }, [retrieveBalance]);

  return (
    <div>
      <Header account={accountBalance} />
      <Main
        deposit={depositBalance}
        account={accountBalance}
        getRetrieveBalance={setRetrieveBalance}
        {...marketInformation}
      />
  </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
