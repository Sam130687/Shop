import { GoodsItem } from "./GoodsItem";
import { useContext } from "react";
import { ShopContext } from "../context";

function GoodList() {
    const {goods} = useContext(ShopContext);

    if (!goods.length) {
        return <h3>Данных нет</h3>
    }

    return <div className="goods">
        {
            goods.map(item => (
                <GoodsItem Key={item.id}{...item}/>
            ))
        }
    </div>
}

export {GoodList}