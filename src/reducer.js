function addOrder(order, item){
    const itemIndex = order.findIndex(el => el.id === item.id);
    if (itemIndex < 0) {
        const newItem = {
            ...item,
            quantity: 1,
        }
        return [...order, newItem];
    } else {
        return order.map((orderItem, index) => {
            if (index === itemIndex) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                }
            } else {
                return orderItem
            }
        })
    }
}

function decQuantity(order, id){
    const item = order.find(el => el.id === id);
        if (item.quantity === 1){
            return order.filter((item) => item.id !== id);
        }
        else
        {
            return order.map((orderItem) => {
                if (orderItem.id === id) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity - 1,
                    }
                } else {
                    return orderItem
                }
            })
        }
}

export function reducer(state, {type, payload}){
    switch(type){
        case 'SET_GOODS':
            return {
                ...state,
                goods: payload || [],
                loading: false
            }
        case 'BASKET_SHOW':
            return {
                ...state,
                isBasketShow: !state.isBasketShow
            }
        case 'DEC_QUANTITY':
            return {
                ...state,
                order: decQuantity(state.order, payload.id)
            }
        case 'INC_QUANTITY':
            return {
                ...state,
                order: addOrder(state.order, state.order.find(el => el.id === payload.id))
            }
        case 'ADD_TO_BASKET':
            return {
                ...state,
                order: addOrder(state.order, payload),
                alertName: payload.name
            }
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((item) => item.id !== payload.id)
            }
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            }
        default: return state;
    }
}