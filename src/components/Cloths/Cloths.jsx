import React from 'react';

import Cloth from './Cloth/Cloth';
import classes from './Cloths.css';

const cloths = props => (
    <div>
        {/* <input type="text" onChange={props.filterCloth.bind(this)} placeholder="Search by name"/> */}
        <section className={classes.Cloths}>
            {props.cloths.map((c, i) => {
                return <Cloth key={c.id} item={c} addClothToCart={props.addToCart} />
            })}
        </section>
    </div>
);

export default cloths;