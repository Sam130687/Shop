import { useContext } from "react";
import { ShopContext } from "../context";

function GoodsItem(props) {
    const {id,
           name,
           description,
           price,
           full_background
        } = props;

    const {addToBusket} = useContext(ShopContext);

    return <div className='card' id={id}>
    <div className='card-image'>
      <img src={full_background} alt={name}/>
    </div>
    <div className='card-content'>
      <span className='card-title'>{name}</span>
      <p>{description}</p>
    </div>
    <div className='card-action'>
          <button
            className='btn'
            onClick={()=>{
              addToBusket({
                id: id,
                name: name,
                price: price,
              })
          }}>Купить</button>
          <span className="right" style={{fontSize: '1.8rem'}}>{price}</span>
    </div>
  </div>
}

export {GoodsItem}