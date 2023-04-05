import React, { useEffect } from 'react';

import styles from "../styles/modules/map.module.scss";
import { useSelector } from 'react-redux';

const MapContent = ({ mapRef, data, setDrawCheck, initText, vageCheck }) => {
  const { mapSrc, vageMapSrc } = useSelector((state) => state.draw);
  useEffect(() => {
    if (!initText) {
      console.log(vageCheck);
      if(vageCheck) {
        getGoogleMapContent(vageMapSrc[0])
      }else if(!vageCheck) {
        console.log("hihi");
        getGoogleMapContent(mapSrc[0])
      }
    }
  }, [mapSrc, vageMapSrc])

  const getGoogleMapContent = (src) => {
    const duration = 1500; // 拉霸效果執行多久
    setTimeout(() => {
      mapRef.current.src = src;
    }, duration);
  }

  return (
      <div className={styles.map}>
        <iframe 
          title="googleMap" 
          ref={mapRef} loading="lazy" 
          className={styles.mapSize} 
          src="" 
          allowFullScreen 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    );
};

export default MapContent;