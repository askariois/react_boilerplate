import img from '../assets/Img/pizza2half.svg'

export  const pizzaData = {
    id: -100,
    name: "Пицца из половинок",
    url: "constructor",
    image: img,
    description: "Собери свою пиццу из двух половинок",
    sort: 10,
    category_id: 1,
    can_buy: true,
    max_free_addons: 0,
    is_new: false,
    is_hit: false,
    is_set: false,
    price_from: 745,
    is_favorite: false,
    sizes: [
    {
        id: 401,
        base: false,
        size: "30",
        size_id: 1,
        price: 840,
        product_id: 9468,
        dougth: false
    },
    {
        id: 402,
        base: false,
        size: "30",
        size_id: 2,
        price: 840,
        product_id: 9468,
        dougth: true
    }
]
}