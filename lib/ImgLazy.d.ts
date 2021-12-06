import React from 'react';
interface propsType {
    placehold?: string;
    src?: string;
    width?: number | string;
    height?: number | string;
    alt?: string;
    crossorigin?: 'anonymous' | 'use-credentials';
    srcset?: string;
    sizes?: string;
}
export declare const ImgLazy: React.NamedExoticComponent<propsType>;
export {};
