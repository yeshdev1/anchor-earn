import './Main.css';
import { roundToTwo } from './utils';

export default ({
    apy
}) => (
        <div className="summary">
            <span className="apy">
                APY
            </span>
            <div className="value">
                {roundToTwo((apy * 100)).toFixed(2)}
            </div>
        </div>
)