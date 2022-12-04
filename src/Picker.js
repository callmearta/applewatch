import React from 'react';
import {HexColorPicker} from 'react-colorful';
import { useSnapshot } from 'valtio';

import State from './State';

function Picker(props){
    const snap = useSnapshot(State);

    const setColor = (color) => {
        State.items[snap.current.name] = color;
    };

    return <div className={"color-picker" + (snap.current ? ' active' : '')} style={{left:snap.mouse.x - 100,top:snap.mouse.y + 100}}><HexColorPicker onChange={setColor} /></div>
}

export default Picker;