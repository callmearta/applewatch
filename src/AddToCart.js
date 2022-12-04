import React from 'react';
import { useSnapshot } from 'valtio';

import State, { PAGES } from './State';

function AddToCart(props) {
    const snap = useSnapshot(State);
    const isInAddedToCartPage = snap.page == PAGES.addedToCart;
    const text = !isInAddedToCartPage ? (snap.addedToCart ? 'Added' : 'Add To Cart') : 'Go Back';

    const clickHandler = () => {
        if(!isInAddedToCartPage){
            State.addedToCart = true;
        }else{
            State.page = PAGES.order;
            State.addedToCart = false;
        }
    };

    return (
        <div className="add-to-cart-wrapper">
            <button onClick={clickHandler} style={{ backgroundColor: snap.addedToCart ? '#1c9359' : null, border: 'none', color: snap.addedToCart ? '#FFF' : '' }}>
                {text}
            </button>
        </div>
    );
}

export default AddToCart;