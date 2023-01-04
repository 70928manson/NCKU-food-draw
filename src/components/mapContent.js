import React from 'react';

import styles from "../styles/modules/map.module.scss";

const mapContent = ({ mapRef }) => {
    return (
        <div className={styles.map}>
          <iframe title="googleMap" ref={mapRef} loading="lazy" frameBorder="0" className={styles.mapSize} src="" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
};

export default mapContent;