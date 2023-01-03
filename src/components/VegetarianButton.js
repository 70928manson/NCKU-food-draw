import React from 'react';
import styles from '../styles/modules/vegeButton.module.scss';

const VegetarianButton = ({ vageCheck, vegeCheckHandler }) => {
    return (
        <div className={styles.vegetarian_container}>
            {vageCheck 
                ? <p className={styles.vegetarian_text} >Vegetarian ?</p> 
                : <p className={styles.not_vegetarian_text} >Vegetarian ?</p>}
            {/*   素食   */}
            <div className={styles.check}>
                <label className={styles.toggle}>
                    <input id="vage" type="checkbox" defaultChecked onClick={vegeCheckHandler}/>
                    <span className={`${styles.button} ${styles.round}`}></span>
                </label>
            </div> 
        </div>
    );
};

export default VegetarianButton;