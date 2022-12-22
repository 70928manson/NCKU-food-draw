import React from 'react';

import styles from '../styles/modules/lottery.module.scss';

const AppLottery = ({vageCheck, vages, meats, clickHandler, test}) => {
    return (
        <div className={styles.lottery}>
            <div className={styles.shop_container}>
                <div className={styles.shop_title} id="shop-title">
                    {test ? <h5>今天要吃什麼</h5> : null}
                    {vageCheck === true ? vages.map((item, index) => {return <h5 key={index}>{item}</h5>}) : meats.map((item, index) => {return <h5 key={index}>{item}</h5>})}
                </div>
            </div>
            <button className={styles.btn_container} onClick={clickHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                    點我熱血開抽
            </button>
        </div>
    );
};

export default AppLottery;