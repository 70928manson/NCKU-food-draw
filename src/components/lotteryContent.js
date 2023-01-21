import React from 'react';

import styles from '../styles/modules/lottery.module.scss';
import '../styles/_mixins.scss'

const AppLottery = ({ vageCheck, vages, meats, clickHandler, initText, drawCheck }) => {
    return (
        <div className={styles.lottery}>
            <div className={styles.shop_container}>
                <div className={styles.shop_title} id="shop-title">
                    {initText ? <h5>今天要吃什麼</h5> : null}
                    {vageCheck === true 
                        ? vages.map((item, index) => {return <h5 key={index}>{item}</h5>}) 
                        : meats.map((item, index) => {return <h5 key={index}>{item}</h5>})
                    }
                </div>
            </div>
            <button 
              className={
                drawCheck === false 
                ? styles.btn_container 
                : `${styles.btn_container} ${styles.notAllow}`
              } 
              onClick={clickHandler}
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                    {drawCheck === false 
                      ? '點我開抽'
                      : <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    }
            </button>
        </div>
    );
};

export default AppLottery;