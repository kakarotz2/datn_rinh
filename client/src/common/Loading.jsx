import Loading from '../img/loading.gif';
import React from 'react';
import './loading.scss';
function LoadingGif() {
    return (
        <div className="loading">
            <img src={Loading} alt="" />
        </div>
    );
}

export default LoadingGif;
