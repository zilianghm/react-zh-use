import React, {useState, useEffect} from 'react';

interface propsType {
    placehold?: string,
    src?: string,
    width?: number | string,
    height?: number | string,
    alt?: string,
    crossorigin?: 'anonymous' | 'use-credentials',
    srcset?: string,
    sizes?: string,
}

const Img: React.FC<propsType> = (props) => {
    const [done, setDone] = useState(false)
    useEffect(() => {
        const img = new Image()
        img.src = props.src as string
        img.onload = () => {
            setDone(true)
        }
    }, [])

    return (
        <>
            {
                done ? <img width={props.width} height={props.height} style={{backgroundColor: '#f1f1f1'}}/> : <img {...props}/>
            }
        </>
    )
}

// props 是否变化
const areEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

// props 没有变化不渲染组件
export const ImgLazy = React.memo(Img, areEqual)

