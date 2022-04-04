import React from 'react';

import styles from '../styles/components/PageIndicator.module.css'

interface props {
    index:number,
    pages:number,
    onClick: Function,
}

/**
 * Carousel indicator
 *
 * @param props
 * @constructor
 */
function CarouselIndicator(props:props) {
    return (
        <div className={styles.container} id={'CarouselIndicator'}>
            {
                [...Array(props.pages)].map((x, index)=>{
                    return <div id={`tab${index}`} key={index} className={`${styles.indicator} ${index==props.index && styles.selected}`} onClick={()=>props.onClick(index)}/>
            })
            }
        </div>
    );
}

export default CarouselIndicator;
