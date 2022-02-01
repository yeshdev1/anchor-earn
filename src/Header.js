import './style.css';
import { roundToTwo } from './utils';

const Header = ({
  account
}) => (
    <header>
      <div className="header">
        <nav className="menu">
          <div data-active="false">
            <a href="/dashboad">
              DASHBOARD
            </a>
          </div>
          <div data-active="false">
            <a href="/my_page">
              MY PAGE
            </a>
          </div>
          <div data-active="true">
            <a href="/earn">
              EARN
            </a>
          </div>
          <div data-active="false">
            <a href="/borrow">
              BORROW
            </a>
          </div>
          <div data-active="false">
            <a href="/basset">
              bASSET
            </a>
          </div>
          <div data-active="false">
            <a href="/govern">
              GOVERN
            </a>
          </div>
        </nav>
        <div className="empty"></div>
        <section className="wallet">
          <button className="wallet-button">
            <span>
              {roundToTwo(account)} UST
            </span>
          </button>
        </section>
      </div>
    </header>
)

export default Header;