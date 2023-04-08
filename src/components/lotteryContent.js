import React, { useEffect } from 'react';

import styles from '../styles/modules/lottery.module.scss';
import '../styles/_mixins.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setStoreData, setStoreSrc, setVageStoreData, setVageStoreSrc } from '../slices/drawSlice';

const AppLottery = ({ vageCheck, data, clickHandler, initText, drawCheck }) => {
    const { store, vageStore } = useSelector((state) => state.draw);
    const dispatch = useDispatch();

    let allShops = [], allSrc = [];
    let vageShops = [], vageSrc = [];

    useEffect(() => {
        if (data) {  
            const shopData = data.values;
            for(let i =0; i < shopData.length; i++) {
                if(shopData[i][0] !== 'shops') {
                  allShops.push(shopData[i][0]);
                  allSrc.push(shopData[i][3]);
    
                  shopData[i][1] === 'yes' && vageShops.push(shopData[i][0]);
                  shopData[i][1] === 'yes' && vageSrc.push(shopData[i][3]);
                }
            }
            dispatch(setStoreData(allShops));

            dispatch(setVageStoreData(vageShops));

            dispatch(setStoreSrc(allSrc));
            
            dispatch(setVageStoreSrc(vageSrc));
        }
    }, [data])

    return (
        <div className={styles.lottery}>
            <div className={styles.shop_container}>
                <div className={styles.shop_title} id="shop-title">
                    {initText && <h5>今天要吃什麼</h5>}
                    {vageCheck === true 
                        ? vageStore.map((item, index) => {return <h5 key={index}>{item}</h5>}) 
                        : store.map((item, index) => {return <h5 key={index}>{item}</h5>})
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
            {store.map((item, index) => {
                return (<h5>{item}</h5>)
            })}
        </div>
    );
};

export default AppLottery;