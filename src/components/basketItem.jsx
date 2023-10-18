import { useContext } from "react";
import { ShopContext } from "../context";

function BasketItem(props){
    const {
        id,
        name,
        price,
        quantity
    } = props;

    const {
        removeFromBusket,
        incQuantity,
        decQuantity
    } = useContext(ShopContext);

    return <li className="collection-item">
        {name}({price}){' '} x
            <i className="material-icons basket-quantity" onClick={() => decQuantity(id)}>remove</i>
            {quantity}
            <i  className="material-icons basket-quantity"  onClick={() => incQuantity(id)}>add</i>
            = {' '}{price*quantity}
        <span className="secondary-content"
            onClick={() => removeFromBusket(id)}>
            <i className="material-icons basket-delete">cancel</i>
        </span>
    </li>
}

export {BasketItem};