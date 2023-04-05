import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import styles from './styles/modules/app.module.scss';
import './styles/_mixins.scss';

import LotteryContent from './components/LotteryContent';
import VegetarianContent from './components/VegetarianButton';
import MapContent from './components/MapContent';

import { useSelector, useDispatch } from 'react-redux';
import { changeDrawShop, changeDrawSrc, changeDrawVageShop, changeDrawVageSrc } from './slices/drawSlice'
import { useGetAllStoresQuery } from './services/googleSheetApi';

import { getWelcomeConsole, getRandomNum } from './utils';

function App() {
  const { data, error, isLoading } = useGetAllStoresQuery();
  const { store, vageStore, mapSrc, vageMapSrc } = useSelector((state) => state.draw);
  const dispatch = useDispatch();

  // //抓出全部的店家資料，並另外取出有提供素食的店家
  // const [allStores, setAllStores] = useState([]);
  // const [vageStores, setVageStores] = useState([]);

  //與店家資料對應的src
  // const [allSrc, setAllSrc] = useState([]);
  // const [vageSrc, setVageSrc] = useState([]);

  const [initText, setInitText] = useState(true);
  const [vageCheck, setVageCheck] = useState(true);
  
  //資料讀取中或拉霸效果再跑時，使用者無法點擊抽獎按鈕
  const [drawCheck, setDrawCheck] = useState(false);

  const mapRef = useRef();

  //let data = [];
  let src = "";

  useEffect(()=> {
    setDrawCheck(true);
    //fetchData();
    getWelcomeConsole();
    setDrawCheck(false)
  }, [])

  // const fetchData = async () => {
  //   await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
  //     .then((res) => {
  //       let data = res.data.values;

  //       let tempMeatSrc=[], tempVageSrc=[];
  //       // let tempMeats=[], tempMeatSrc = [];

  //       for(let i =0; i < data.length; i++) {
  //         if(data[i][0] !== 'shops') {
  //           // data[i][1] === 'yes' ? tempVages.push(data[i][0]): tempMeats.push(data[i][0]);
  //           data[i][1] === 'yes' ? tempVageSrc.push(data[i][3]) : tempMeatSrc.push(data[i][3]);
  //         }
  //       }
  //       //setVageStores(tempVages);
  //       setVageSrc(tempVageSrc);

  //       //setAllStores(tempMeats);
  //       setAllSrc(tempMeatSrc);
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  // }

  const clickHandler = () => {
    let randomNum;

    //避免使用者重複點擊抽獎按鈕
    setDrawCheck(true);
    //移除拉霸"今天要吃什麼"初始文字
    if(initText === true) {
      setInitText(false);
    }

    if(vageCheck) {
      randomNum = getRandomNum(vageStore);
      getDrawShop(vageStore, randomNum);
      src = getShopSrc(vageStore, randomNum);
    }else {
      randomNum = getRandomNum(store);
      getDrawShop(store, randomNum);
      src = getShopSrc(store, randomNum);
    }

    //避免未抓取到src
    if(!src) {
      setDrawCheck(false);
      return
    }
  
    getGoogleMapContent(vageMapSrc[0]);

  }

  const getDrawShop = (shops, randomNum) => {
    //將陣列中隨機選到的店家與第一個店家互換
    if (shops === store) {
      console.log("hi");
      dispatch(changeDrawShop(randomNum));
    }else if (shops === vageStore) {
      console.log("hi");
      dispatch(changeDrawVageShop(randomNum));
    }
    //shops[0] = shops.splice(randomNum, 1, shops[0])[0];
    // if(shops === vageStore) {
    //   setVageStores(shops);
    // }else if(shops === allStore) {
    //   setAllStores(shops);
    // }
  }

  const getShopSrc = (shops, randomNum) => {
    let src = "";

    if(shops === store) {
      //google map
      // let tempVageSrc = [...vageMapSrc];
      // //選到的隨機店家與陣列第一個互換
      // tempVageSrc[0] = tempVageSrc.splice(randomNum, 1, tempVageSrc[0])[0];
      // setVageSrc(tempVageSrc);
      // src = tempVageSrc[0];
      //return src;
      dispatch(changeDrawSrc(randomNum));
      src = mapSrc[0];
      return src;
    }else if(shops === vageStore) {
      //google map
      // let tempMeatSrc = [...mapSrc];
      // tempMeatSrc[0] = tempMeatSrc.splice(randomNum, 1, tempMeatSrc[0])[0];
      // setAllSrc(tempMeatSrc);
      // src = tempMeatSrc[0];
      //return src;
      dispatch(changeDrawVageSrc(randomNum));
      src = vageMapSrc[0]
      return src
    }
  }

  const getGoogleMapContent = (src) => {
    const list = document.querySelectorAll('#shop-title > h5');
    Array.prototype.forEach.call(list, item => item.classList.add(`span`));
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
      //mapRef.current.src = src;
      Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
      setDrawCheck(false);
    }, duration);
  }

  const vegeCheckHandler = () => {
    setInitText(true);
    setVageCheck(!vageCheck);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>成大美食抽抽樂</h1>
      </header>
      <section className={styles.main_content}>
        <LotteryContent vageCheck={vageCheck} data={data} clickHandler={clickHandler} initText={initText} drawCheck={drawCheck}></LotteryContent>
        <VegetarianContent vageCheck={vageCheck} vegeCheckHandler={vegeCheckHandler} drawCheck={drawCheck}></VegetarianContent>
        <MapContent mapRef={mapRef} data={data} setDrawCheck={setDrawCheck} initText={initText} vageCheck={vageCheck}></MapContent>
      </section>
      <footer className="text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;