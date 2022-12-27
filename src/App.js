import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import styles from './styles/modules/app.module.scss';
import './styles/_mixins.scss';

import AppLottery from './components/AppLottery';
import VegetarianButton from './components/VegetarianButton';

function App() {
  const [vages, setVages] = useState([]); //素
  const [meats, setMeats] = useState([]);  //葷 吃肉肉

  const [vageSrc, setVageSrc] = useState([]);
  const [meatSrc, setMeatSrc] = useState([]);


  const [vageCheck, setVageCheck] = useState(true);

  const [test, setTest] = useState(true);
  const [drawCheck, setDrawCheck] = useState(false);
  const mapRef = useRef()

  useEffect(()=> {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        let tempData = res.data.values;

        let length = tempData.length;

        let tempVages = [];
        let tempVageSrc = [];
        let tempMeats = [];
        let tempMeatSrc = [];
        for(let i =0; i < length; i++) {
          if(tempData[i][0] !== 'shops') {
            tempData[i][1] === 'yes' ? tempVages.push(tempData[i][0]) : tempMeats.push(tempData[i][0]);
            tempData[i][1] === 'yes' ? tempVageSrc.push(tempData[i][3]) : tempMeatSrc.push(tempData[i][3]);
          }
        }
        console.log('tempVages', tempVages);
        console.log('tempMeats', tempMeats);

        setVages(tempVages);
        setVageSrc(tempVageSrc);

        setMeats(tempMeats);
        setMeatSrc(tempMeatSrc)

        console.log('vages', vages);
        console.log('meats', meats);

      }).catch((res) => {
        console.log(res)
      })
  }

  const clickHandler = () => {
    console.log('123', vages);
    let randomNum; //亂數
    let max, min; // 陣列的最大、小值
    let vageJudge = true; // 結果

    let src; //fix useState

    setDrawCheck(true);

    const chooseShop = (shop) => {
      //s參數是陣列
      //取得隨機亂數
      randomNum = () => {
        max = shop.length - 1;
        min = 0;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      //第一個與亂數shop交換
      let tempShop = [...shop];
      let tempRandomNum = randomNum();
      tempShop[0] = tempShop.splice(tempRandomNum, 1, tempShop[0])[0];

      if(shop === vages) {
        vageJudge = true;
        setVages(tempShop);
        //google map
        let tempVageSrc = [...vageSrc];
        tempVageSrc[0] = tempVageSrc.splice(tempRandomNum, 1, tempVageSrc[0])[0];
        //setState更新的值下一次render才會出來，無法使用vageSrc[0]，因此用src變數去記
        setVageSrc(tempVageSrc);
        src = tempVageSrc[0];
      }else {
        vageJudge = false;
        setMeats(tempShop);
        //google map
        let tempMeatSrc = [...meatSrc];
        tempMeatSrc[0] = tempMeatSrc.splice(tempRandomNum, 1, tempMeatSrc[0])[0];
        setMeatSrc(tempMeatSrc);
        src = tempMeatSrc[0];
      }
    }

    vageCheck ? chooseShop(vages) : chooseShop(meats);

    if(test === true) {
      setTest(false);
    }
    const list = document.querySelectorAll('#shop-title > h5');
    console.log('12/20 list', list, styles.span);
    Array.prototype.forEach.call(list, item => item.classList.add(`span`));
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      // 停止拉霸動畫
      Array.prototype.forEach.call(list, item => item.removeAttribute('class'));
      // map.src = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_KEY}&q=${text}`;
      if(vageJudge) {
        mapRef.current.src = src;
      }else {
        mapRef.current.src = src;
      }
      setDrawCheck(false);
    }, duration);
  }

  const vegeCheckHandler = () => {
    setTest(true);
    console.log('check');
    setVageCheck(!vageCheck);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>成大美食抽抽樂</h1>
      </header>
      <section className={styles.main_content}>
        <AppLottery vageCheck={vageCheck} vages={vages} meats={meats} clickHandler={clickHandler} test={test} drawCheck={drawCheck}></AppLottery>
        <VegetarianButton vegeCheckHandler={vegeCheckHandler}></VegetarianButton>
        <div className="">
          <iframe ref={mapRef} loading="lazy" frameBorder="0" className="" width="585" height="325" src="" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
      <footer className="text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;