type NewArrivals = {
    price: number,
    name:string,
    category:string,
    imgPath: string,
}

type CarouselItemProps = NewArrivals & {
    width: number
}

export type {CarouselItemProps, NewArrivals}
