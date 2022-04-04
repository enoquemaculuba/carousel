import React, {useState} from 'react';
import Image from 'next/image'
import {CarouselItemProps} from "../types/types";
import styles from '../styles/components/CarouselItem.module.css'

/**
 * Carousel item
 *
 * @param props
 * @constructor
 */
function CarouselItem(props:CarouselItemProps) {

    const [like, setLike] = useState(false);

    return (
        <div style={{maxWidth:`${props.width}px`}}>
            <div className={styles.carouselItemContainer}>
                <div className={styles.imageContainer}>
                    <Image src={props.imgPath} width={`${props.width}px`} height={`${props.width}px`} alt="Picture of the item"/>
                    <a className={styles.price}>{`€ ${props.price}`}</a>
                    <button className={styles.heart} onClick={()=>setLike(!like)}>{like ? '♥' : '♡'}</button>
                </div>
                <div className={styles.carouselItemTextContainer}>
                    <a id={'name'}>{props.name}</a>
                    <a className={styles.carouselItemCategory}>{props.category}</a>
                    <a>new</a>
                </div>
            </div>
        </div>
    );
}

export default CarouselItem;
