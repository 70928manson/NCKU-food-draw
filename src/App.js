import './styles/App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';  //處理cors問題

function App() {
  const [vages, setVages] = useState([]); //素
  const [meats, setMeats] = useState([]);  //葷 吃肉肉
  const [vageCheck, setVageCheck] = useState(true);

  const [test, setTest] = useState(true);

  useEffect(()=> {
    // fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        let tempData = res.data.values;
        console.log('tempData' ,tempData);

        let length = tempData.length;
        console.log('length', length);

        let tempVages = [];
        let tempMeats = [];
        for(let i =0; i < length; i++) {
          if(tempData[i][0] !== 'shops') {
            tempData[i][1] === 'yes' ? tempVages.push(tempData[i][0]) : tempMeats.push(tempData[i][0]);
          }
        }
        console.log('tempVages', tempVages);
        console.log('tempMeats', tempMeats);
        setVages(tempVages);
        setMeats(tempMeats);

        console.log('vages', vages);
        console.log('meats', meats);
        if(test === true) {
          setTest(false);
        }
      }).catch((res) => {
        console.log(res)
      })
  }

  const vageCheckHandler = () => {
    console.log('check');
    setVageCheck(!vageCheck);
  }

  return (
    <div className="container">
      <header className="card-header text-center py-2">
        <h1>今天吃什麼</h1>
        <p>立刻熱血開抽</p>
      </header>
      <section className="card-body d-flex flex-column justify-content-center align-items-center">
        <div className="lottery d-flex flex-column">
          <h1>顯示區</h1>
          <div className="show-shop">
            <div className="overflow-hidden show-shop-container">
              {vageCheck === true ? vages.map((item, index) => {return <h5 key={index}>{item}</h5>}) : meats.map((item, index) => {return <h5 key={index}>{item}</h5>})}
              {test ? <h5>今天要吃什麼</h5> : null}
            </div>
          </div>
          <a href="#" className="btn-container" onClick={fetchData}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Button
          </a>
        </div>
				<div className="checkbox">
					<p className="vegetarian">Vegetarian?</p>

					{/*   素食   */}
					<div className="check">
						<label className="toggle">
							<input id="vage" type="checkbox" defaultChecked onClick={vageCheckHandler}/>
							<span className="button round"></span>
						</label>
					</div> 
				</div>
        <div className="google-map"></div>
      </section>
      <footer className="card-footer text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
