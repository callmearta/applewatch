import React from 'react';
import { useSnapshot } from 'valtio';

import State, { PAGES } from './State';

function Heading(props) {
    const snap = useSnapshot(State);
    const isInCartPage = snap.page == PAGES.addedToCart;
    const text = !isInCartPage ? snap.current ? snap.names[snap.current.name] : "Apple Watch" : 'Like what you see?';

    return (
        <>
            <h1 className={'active'}>
                {text}
            </h1>
            {isInCartPage ?
                <p>
                    If you want such thing for your own product, Contact Us At <strong><a href="https://karo.studio/" title="Karo Studio" target="_blank">Karo.Studio</a></strong>
                </p>
                : ''}
        </>
    );
}

export default Heading;