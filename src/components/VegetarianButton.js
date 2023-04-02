import React from 'react';
import styles from '../styles/modules/vegeButton.module.scss';

const VegetarianButton = ({ vageCheck, vegeCheckHandler, drawCheck }) => {
    return (
        <div className={drawCheck === false ? styles.vegetarian_container : `${styles.vegetarian_container} ${styles.disabled}`}>
            <p className={vageCheck ? styles.vegetarian_text : styles.not_vegetarian_text}>Vegetarian Served?</p>
            {/*   素食   */}
            <div className={styles.check}>
                <label className={styles.toggle}>
                    { drawCheck === false 
                        ? <input id="vage" type="checkbox" defaultChecked onClick={vegeCheckHandler} />
                        : <input id="vage" type="checkbox" defaultChecked onClick={vegeCheckHandler} disabled/>
                    }
                    {/* <input id="vage" type="checkbox" defaultChecked onClick={vegeCheckHandler} /> */}
                    <span className={`${styles.button} ${styles.round}`}></span>
                </label>
            </div> 
        </div>
    );
};

export default VegetarianButton;