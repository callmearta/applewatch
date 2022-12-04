import React,{useState,useEffect} from 'react';
import {useProgress} from '@react-three/drei';

function Loading(props) {
    const { progress } = useProgress();
    const [loaded, set] = useState(false);

    useEffect(() => {
        if (progress.toFixed(0) == 100) {
            setTimeout(() => {
                set(true);
            }, 3000);
        }
    }, [progress]);

    return (
        !loaded ? <div className={"loading" + (progress.toFixed(0) == 100 ? ' fadeOut' : '')}>
            <strong className="loading-text">{progress.toFixed(0)}%</strong>
        </div> : null
    );
}

export default Loading;