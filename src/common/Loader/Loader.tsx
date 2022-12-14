import React from 'react';
import styles from "./Loader.module.css"

export const Loader = () => {
    return (
        <div className={`${styles.loading} ${styles.loading01}`}>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
    );
};

