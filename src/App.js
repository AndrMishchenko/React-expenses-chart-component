import './App.css';
import logo from './Photo/logo.svg'
import axios from 'axios'
import {useState, useEffect} from 'react';
import data from './data.json';

function App() {

  const [getInfo, setGetInfo] = useState([]);

  const sumAmount = data.reduce((sum, amount) => sum + amount.amount,0)
  const maxAmount = getInfo.reduce((startAmount, getMax) => Math.max(startAmount,getMax.amount),0)

  useEffect(() => {
    axios
      .get('data.json')
      .then(response => {
        setGetInfo(response.data)
      })
  },[])

  return (
    <>
      <div className='main-block'>
        <div className='block-ballance'>
          <div className='my-balance'>
            <p className='my-balance-title'>My balance</p>
            <p className='my-balance-sum'>$921.48</p>
          </div>
          <img src={logo}></img>
        </div>

        <div className='block-diagram'>
          <div className='block-info'>
          <h2>Spending - Last 7 days</h2>
            <div className='block-gistogram'>
              {getInfo.map(sum => (
                <div 
                  className='block-gistogram-el'
                  style={{'--height-percentage' : `${sum.amount / maxAmount}`}}
                >
                  <span className='sum-gistogram'>${sum.amount}</span>
                </div>
                
              ))}
            </div>
            <div className='border'></div>
            <div className='total-block'>
              <div className='total-month'>
                <p className='total-month-title'>Total this month</p>
                <p className='total-month-sum'>$478.33</p>
              </div>
              <div className='total-week'>
                <p className='total-week-title'>Total this week</p>
                <p className='total-week-sum'>${sumAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;