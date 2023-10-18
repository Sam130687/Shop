import { GoodsItem } from "./GoodsItem";

function GoodList(props) {
    const {goods = [], addToBusket = Function.prototype} = props;

    if (!goods.length) {
        return <h3>Данных нет</h3>
    }

    return <div className="goods">
        {
            goods.map(item => (
                <GoodsItem Key={item.id}{...item} addToBusket={addToBusket}/>
            ))
        }
    </div>
}

export {GoodList}