import React, { useState, useEffect } from 'react';
const Img = (props) => {
    const [done, setDone] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.src = props.src;
        img.onload = () => {
            setDone(true);
        };
    }, []);
    return (React.createElement(React.Fragment, null, done ? React.createElement("img", { width: props.width, height: props.height, style: { backgroundColor: '#f1f1f1' } }) : React.createElement("img", { ...props })));
};
const areEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};
export const ImgLazy = React.memo(Img, areEqual);
