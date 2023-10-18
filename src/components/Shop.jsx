import React, {useState, useEffect} from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./basketList";
import { Alert } from "./Alert";

function Shop() {
    const [goods, setGoods]=useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBusket=(item) => {
        const itemIndex = order.findIndex(el => el.id === item.id);
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(newOrder);
        }
        setAlertName(item.name);
    }

    const removeFromBusket = (itemId) => {
        const newOrder = order.filter((item) => item.id !== itemId);
        setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const item = order.find(el => el.id === itemId);
        addToBusket(item);
    }
    const decQuantity = (itemId) => {
        const item = order.find(el => el.id === itemId);
        if (item.quantity === 1){
            removeFromBusket(itemId)
        }
        else
        {
            const newOrder = order.map((orderItem) => {
                if (orderItem.id === itemId) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity - 1,
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(newOrder);
        }
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const closeAlert =() => {
        setAlertName('');
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(Response => Response.json()).then(data => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        })
    }, [])

    return <main className = 'container content'>
        <Cart
            quantity = {order.length}
            handleBasketShow={handleBasketShow}
         />
        {
            loading ? <Preloader/> : <GoodList goods={goods} addToBusket={addToBusket}/>
        }
        {
            isBasketShow && <BasketList 
                order={order} 
                handleBasketShow={handleBasketShow}
                removeFromBusket={removeFromBusket}
                incQuantity={incQuantity}
                decQuantity={decQuantity}/>
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
        }
    </main>
}

export {Shop}