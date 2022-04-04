import React, {useEffect, useRef, useState} from 'react';

import json from '../assets/items.json'
import CarouselItem from "./CarouselItem";
import {NewArrivals} from "../types/types";
import CarouselIndicator from "./CarouselIndicator";

import styles from '../styles/components/Carousel.module.css'


/**
 * Carousel component
 *
 * @param props
 * @constructor
 */
function Carousel(props: {
    itemWidth: number
    gap: number;
}) {

    const [isTouchDevice, setTouchDevice] = useState(false);

    const [width, setWidth] = useState<undefined | number>(undefined)

    const [children, setChildren] = useState<Array<NewArrivals>>([]);

    const [currentIndex, setCurrentIndex] = useState(0)

    const containerRef = useRef<HTMLHeadingElement>(null);

    const contentRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const newArrivals = json.items.slice(0, 12); //Get first 12 new arrivals

        setChildren(newArrivals);

        setTouchDevice(window.matchMedia("(pointer: coarse)").matches);

        containerRef.current && setWidth(containerRef.current.offsetWidth);

        const onResize = () => containerRef.current && setWidth(containerRef.current.offsetWidth);

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [])


    //Items per page
    const items = width !== undefined ? Math.max(Math.floor(width / (props.itemWidth + props.gap)), 1) : 1;

    //How many pages
    const pages = Math.max(Math.ceil(children.length / items), 0);

    /**
     * On right button click
     */
    const right = () => {
        if (currentIndex !== pages - 1) {
            setCurrentIndex(prevState => Math.min(prevState + 1, pages - 1))

            isTouchDevice && scrollToIndex(currentIndex + 1);
        }
    }

    /**
     * On left button click
     */
    const left = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => Math.max(0, prevState - 1))

            isTouchDevice && scrollToIndex(currentIndex - 1);
        }
    }

    /**
     * Scroll to index on touch devices
     *
     * @param index
     */
    const scrollToIndex = (index: number) => {
        if (contentRef.current) {
            let div = contentRef.current;
            div.scrollTo({left: (props.itemWidth + props.gap) * index * items, behavior: 'smooth'})
        }
    }

    /**
     * On page indicator click
     *
     * @param index
     */
    const onClick = (index: number) => isTouchDevice ? scrollToIndex(index) : setCurrentIndex(index);

    /**
     * On scroll handler
     *
     * @param e
     */
    const onScroll = (e: React.UIEvent) => {
        let div = e.target as HTMLElement;
        let index = Math.ceil(div.scrollLeft / ((props.itemWidth + props.gap) * items))
        setCurrentIndex(index)
    }

    return (
        <div ref={containerRef}>
            <div className={styles.carouselTextContainer}>
                <h1>NEW ARRIVALS</h1>
                <b className={styles.underline}>VIEW ALL</b>
            </div>
            <div className={styles.carouselContainer}>
                <div className={styles.carouselWrapper}>
                    {
                        currentIndex > 0 &&
                        <button className={styles.leftArrow} onClick={left} id={'leftArrow'}>
                            ←
                        </button>
                    }
                    {
                        currentIndex !== pages - 1 &&
                        <button onClick={right} className={styles.rightArrow} id={'rightArrow'}>
                            →
                        </button>
                    }
                    <div className={styles.carouselContentWrapper} ref={contentRef} onScroll={onScroll}>
                        <div className={styles.carouselContent}
                             style={isTouchDevice ? {gap: props.gap} : {
                                 gap: props.gap,
                                 transform: `translateX(-${currentIndex * (props.itemWidth + props.gap) * items}px)`
                             }}>
                            {
                                children.map((item: NewArrivals, index: number) => {
                                    return <CarouselItem key={index}
                                                         width={props.itemWidth}
                                                         price={item.price}
                                                         name={item.name}
                                                         category={item.category}
                                                         imgPath={item.imgPath}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CarouselIndicator index={currentIndex} pages={pages} onClick={onClick}/>
        </div>

    );
}

export default Carousel;
