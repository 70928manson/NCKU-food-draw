import './styles/App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';  //處理cors問題

function App() {
  const [vages, setVages] = useState([]); //素
  const [meats, setMeats] = useState([]);  //葷 吃肉肉
  const [vageCheck, setVageCheck] = useState(true);

  const [test, setTest] = useState(true);

  const [mapSrc, setMapSrc] = useState('');

  useEffect(()=> {
    fetchData();
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
      }).catch((res) => {
        console.log(res)
      })
  }
  const clickHandler = () => {
    let randomNum; //亂數
    let max, min; // 陣列的最大、小值
    let text; // 結果

    const chooseShop = (s) => {
      //s參數是陣列
      //取得隨機亂數
      randomNum = () => {
        max = s.length - 1;
        min = 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      //第一個與亂數shop交換
      let tempS = [...s];
      tempS[0] = tempS.splice(randomNum(), 1, tempS[0])[0];
      text = tempS[0];

      if(s === vages) {
        setVages(tempS);
      }else {
        setMeats(tempS);
      }
    }
    vageCheck ? chooseShop(vages) : chooseShop(meats);

    if(test === true) {
      setTest(false);
    }
    const list = document.querySelectorAll('.show-shop-container > h5');
    Array.prototype.forEach.call(list, item => item.classList.add('span'));
    const duration = 2000; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
      Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
    }, duration);
  }

  const vageCheckHandler = () => {
    setTest(true);
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
              {test ? <h5>今天要吃什麼</h5> : null}
              {vageCheck === true ? vages.map((item, index) => {return <h5 key={index}>{item}</h5>}) : meats.map((item, index) => {return <h5 key={index}>{item}</h5>})}
            </div>
          </div>
          <button className="btn-container" onClick={clickHandler}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            點我熱血開抽
          </button>
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
        <div className="google-map">
          <iframe loading="lazy" frameBorder="0" className="" src="" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
      <footer className="card-footer text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
