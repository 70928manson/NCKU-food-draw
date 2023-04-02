import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import styles from './styles/modules/app.module.scss';
import './styles/_mixins.scss';

import LotteryContent from './components/LotteryContent';
import VegetarianContent from './components/VegetarianButton';
import MapContent from './components/MapContent';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './slices/drawSlice';

import { getWelcomeConsole } from './utils/haveFun';

function App() {
  //店家資料分為素的與葷的
  const [vages, setVages] = useState([]);
  const [meats, setMeats] = useState([]);

  //與店家資料對應的src
  const [vageSrc, setVageSrc] = useState([]);
  const [meatSrc, setMeatSrc] = useState([]);

  const [initText, setInitText] = useState(true);
  const [vageCheck, setVageCheck] = useState(true);
  //資料讀取中或拉霸效果再跑時，使用者無法點擊抽獎按鈕
  const [drawCheck, setDrawCheck] = useState(false);

  const mapRef = useRef();

  let data = [];
  let src = "";

  useEffect(()=> {
    setDrawCheck(true);
    fetchData();
    getWelcomeConsole();
    setDrawCheck(false)
  }, [])

  const fetchData = async () => {
    await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        data = res.data.values;

        let tempVages=[], tempVageSrc=[];
        let tempMeats=[], tempMeatSrc = [];

        for(let i =0; i < data.length; i++) {
          if(data[i][0] !== 'shops') {
            data[i][1] === 'yes' ? tempVages.push(data[i][0]): tempMeats.push(data[i][0]);
            data[i][1] === 'yes' ? tempVageSrc.push(data[i][3]) : tempMeatSrc.push(data[i][3]);
          }
        }
        setVages(tempVages);
        setVageSrc(tempVageSrc);

        setMeats(tempMeats);
        setMeatSrc(tempMeatSrc);
      }).catch((err) => {
        console.log(err)
      })
  }

  const clickHandler = () => {
    let randomNum;

    //避免使用者重複點擊抽獎按鈕
    setDrawCheck(true);
    //移除拉霸"今天要吃什麼"初始文字
    if(initText === true) {
      setInitText(false);
    }

    if(vageCheck) {
      randomNum = getRandomNum(vages);
      getDrawShop(vages, randomNum);
      src = getShopSrc(vages, randomNum);
    }else {
      randomNum = getRandomNum(meats);
      getDrawShop(meats, randomNum);
      src = getShopSrc(meats, randomNum);
    }

    //避免未抓取到src
    if(!src) {
      setDrawCheck(false);
      return
    }
    
    getGoogleMapContent(src);
  }

  const getDrawShop = (shops, randomNum) => {
    //將陣列中隨機選到的店家與第一個店家互換
    shops[0] = shops.splice(randomNum, 1, shops[0])[0];
    if(shops === vages) {
      setVages(shops);
    }else if(shops === meats) {
      setMeats(shops);
    }
  }

  const getShopSrc = (shops, randomNum) => {
    let src = "";

    if(shops === vages) {
      //google map
      let tempVageSrc = [...vageSrc];
      tempVageSrc[0] = tempVageSrc.splice(randomNum, 1, tempVageSrc[0])[0];
      setVageSrc(tempVageSrc);
      src = tempVageSrc[0];
      return src;
    }else if(shops === meats) {
      //google map
      let tempMeatSrc = [...meatSrc];
      tempMeatSrc[0] = tempMeatSrc.splice(randomNum, 1, tempMeatSrc[0])[0];
      setMeatSrc(tempMeatSrc);
      src = tempMeatSrc[0];
      return src;
    }
  }

  const getGoogleMapContent = (src) => {
    const list = document.querySelectorAll('#shop-title > h5');
    Array.prototype.forEach.call(list, item => item.classList.add(`span`));
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
      mapRef.current.src = src;
      Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
      setDrawCheck(false);
    }, duration);
  }

  const vegeCheckHandler = () => {
    setInitText(true);
    setVageCheck(!vageCheck);
  }

  //取得隨機亂數
  const getRandomNum = (shop) => {
    // 陣列的最大、小值
    let max = shop.length - 1;
    let min = 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>成大美食抽抽樂</h1>
      </header>
      <section className={styles.main_content}>
        <LotteryContent vageCheck={vageCheck} vages={vages} meats={meats} clickHandler={clickHandler} initText={initText} drawCheck={drawCheck}></LotteryContent>
        <VegetarianContent vageCheck={vageCheck} vegeCheckHandler={vegeCheckHandler} drawCheck={drawCheck}></VegetarianContent>
        <MapContent mapRef={mapRef}></MapContent>
      </section>
      <footer className="text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;