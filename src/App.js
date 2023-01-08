import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import styles from './styles/modules/app.module.scss';
import './styles/_mixins.scss';

import LotteryContent from './components/LotteryContent';
import VegetarianContent from './components/VegetarianButton';
import MapContent from './components/MapContent';

function App() {
  //資料分為素的與葷的
  const [vages, setVages] = useState([]);
  const [meats, setMeats] = useState([]);

  //
  const [vageSrc, setVageSrc] = useState([]);
  const [meatSrc, setMeatSrc] = useState([]);

  const [initText, setInitText] = useState(true);  //TODO: 改成判斷vages | meats 有沒有東西
  const [vageCheck, setVageCheck] = useState(true);
  const [drawCheck, setDrawCheck] = useState(false);
  const mapRef = useRef()

  useEffect(()=> {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        let tempData = res.data.values;
        let length = tempData.length;

        let tempVages=[], tempVageSrc=[];
        let tempMeats=[], tempMeatSrc = [];

        for(let i =0; i < length; i++) {
          if(tempData[i][0] !== 'shops') {
            tempData[i][1] === 'yes' ? tempVages.push(tempData[i][0]): tempMeats.push(tempData[i][0]);
            tempData[i][1] === 'yes' ? tempVageSrc.push(tempData[i][3]) : tempMeatSrc.push(tempData[i][3]);
          }
        }
        setVages(tempVages);
        setVageSrc(tempVageSrc);

        setMeats(tempMeats);
        setMeatSrc(tempMeatSrc)

        console.log('vages', vages);
        console.log('meats', meats);

      }).catch((err) => {
        console.log(err)
      })
  }

  const clickHandler = () => {
    let src;

    setDrawCheck(true);

    const chooseShop = (shop) => {
      let randomNum = getRandomNum(shop);
      shop[0] = shop.splice(randomNum, 1, shop[0])[0];

      if(shop === vages) {
        setVages(shop);

        //google map
        let tempVageSrc = [...vageSrc];
        tempVageSrc[0] = tempVageSrc.splice(randomNum, 1, tempVageSrc[0])[0];
        //setState更新的值下一次render才會出來，無法使用vageSrc[0]，因此用src變數去記
        setVageSrc(tempVageSrc);
        src = tempVageSrc[0];
      }else {
        setMeats(shop);

        //google map
        let tempMeatSrc = [...meatSrc];
        tempMeatSrc[0] = tempMeatSrc.splice(randomNum, 1, tempMeatSrc[0])[0];
        setMeatSrc(tempMeatSrc);
        src = tempMeatSrc[0];
      }
    }

    vageCheck ? chooseShop(vages) : chooseShop(meats);

    if(initText === true) {
      setInitText(false);
    }

    //todo: set google map
    const list = document.querySelectorAll('#shop-title > h5');
    Array.prototype.forEach.call(list, item => item.classList.add(`span`));
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
      Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
      // map.src = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_KEY}&q=${text}`;
      mapRef.current.src = src;
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