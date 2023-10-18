import React, {useEffect, useContext} from "react";
import { API_KEY, API_URL } from "../config";
import { Preloader } from "./Preloader";
import { GoodList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./basketList";
import { Alert } from "./Alert";
import { ShopContext } from "../context";

function Shop() {
    const {setGoods, loading, isBasketShow, alertName} = useContext(ShopContext);

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(Response => Response.json()).then(data => {
            setGoods(data.featured);
        })
    }, [])

    return <main className = 'container content'>
        <Cart/>
        {loading ? <Preloader/> : <GoodList/>}
        {isBasketShow && <BasketList/>}
        {alertName && <Alert/>}
    </main>
}

export {Shop}