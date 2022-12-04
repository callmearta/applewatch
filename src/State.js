import {proxy} from 'valtio';

export const PAGES = {
    order: 'ORDER',
    addedToCart: 'ADDED_TO_CART',
};

const State = proxy({
    current: null,
    addedToCart: false,
    page: PAGES.order,
    defaultItems:{
        "band-bottom": "#FFF",
        "band-top": "#FFF",
        "crown-color": "red",
        "crown-inner": "#FFF",
        "crown-outer": "#FFF",
        "bezel": "#efefef"
    },
    items:{
        "band-bottom": "#FFF",
        "band-top": "#FFF",
        "crown-color": "red",
        "crown-inner": "#FFF",
        "crown-outer": "#FFF",
        "bezel": "#efefef"
    },
    names:{
        "band-bottom": "Bottom Band",
        "band-top": "Top Band",
        "crown-color": "Crown",
        "crown-inner": "Crown Inner",
        "crown-outer": "Crown Outer",
        "bezel": "Bezels"
    },
    mouse:{
        x:0,
        y:0
    }
});

export default State;