import React, { useEffect, useRef, useState } from 'react'

interface propsType {
    placehold?: string
    src?: string
    width?: number | string
    height?: number | string
    alt?: string
    crossorigin?: 'anonymous' | 'use-credentials'
    srcset?: string
    sizes?: string
}

// props 是否变化
let areEqual = (prevProps: any, nextProps: any) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}

export const ImgLazy = React.memo((props: propsType) => {
    const imgRef = useRef<HTMLImageElement | null>(null)
    const [done, setDone] = useState(false)

    useEffect(() => {
        const img = imgRef.current as HTMLImageElement
        const observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 占位图出现在视口中，开始加载图片
                    const img = entry.target as HTMLImageElement
                    // 使用虚拟 img 元素来下载图片资源
                    const imgA = new Image()
                    const src = img.dataset.src as string
                    img.removeAttribute('data-src')
                    self.unobserve(entry.target)
                    imgA.src = src
                    // 图片下载完成，被浏览器缓存
                    imgA.onload = () => {
                        // 真正的 img 元素加载本地缓存资源
                        img.src = src
                        // 改变状态，重新渲染页面
                        setDone(true)
                    }
                }
            })
        })
        // 开始监听占位图是否在视口中
        observer.observe(img)
    }, [])
    return (
        <div>
            <img
                alt=''
                ref={imgRef}
                data-src={props.src}
                width={props.width}
                height={props.height}
                // 占位图样式
                {...(done && props.placehold
                    ? { src: props.placehold }
                    : { style: { backgroundColor: '#f1f1f1' } })}
            />
        </div>
    )
}, areEqual)


