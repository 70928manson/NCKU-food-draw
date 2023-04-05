import React, { useState, useEffect, useRef } from 'react';

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
  //抓出全部的店家資料，並另外取出有提供素食的店家，以及與店家相對應的src
  const { data, error, isLoading } = useGetAllStoresQuery();
  const { store, vageStore, mapSrc, vageMapSrc } = useSelector((state) => state.draw);
  const dispatch = useDispatch();

  const [initText, setInitText] = useState(true);
  const [vageCheck, setVageCheck] = useState(true);

  //資料讀取中或拉霸效果再跑時，使用者無法點擊抽獎按鈕
  const [drawCheck, setDrawCheck] = useState(false);
  const mapRef = useRef();
  
  let src = "";

  useEffect(()=> {
    setDrawCheck(true);
    getWelcomeConsole();
    setDrawCheck(false)
  }, [])


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
      src = getDrawShopSrc(vageStore, randomNum);
    }else {
      randomNum = getRandomNum(store);
      getDrawShop(store, randomNum);
      src = getDrawShopSrc(store, randomNum);
    }

    //避免未抓取到src
    if(!src) {
      setDrawCheck(false);
      return
    }
    slotAnimationHandler();
  }

  const getDrawShop = (shops, randomNum) => {
    //將陣列中隨機選到的店家與第一個店家互換
    if (shops === store) {
      dispatch(changeDrawShop(randomNum));
    }else if (shops === vageStore) {
      dispatch(changeDrawVageShop(randomNum));
    }
  }

  const getDrawShopSrc = (shops, randomNum) => {
    let src = "";

    if(shops === store) {
      dispatch(changeDrawSrc(randomNum));
      src = mapSrc[0];
      return src;
    }else if(shops === vageStore) {
      dispatch(changeDrawVageSrc(randomNum));
      src = vageMapSrc[0]
      return src
    }
  }

  const slotAnimationHandler = () => {
    const list = document.querySelectorAll('#shop-title > h5');
    Array.prototype.forEach.call(list, item => item.classList.add(`span`));
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
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
        <MapContent mapRef={mapRef} initText={initText} vageCheck={vageCheck}></MapContent>
      </section>
      <footer className="text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;