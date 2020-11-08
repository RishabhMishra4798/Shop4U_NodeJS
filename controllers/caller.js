const getWishRow = async (id) => {
  UserItem.getNumberOfItemsInWishlistByUserId(id, (err, useritems)=>{
    return useritems.length;
  })
}

const getCartRow = async (id) => {
  UserItem.getNumberOfItemsInCartByUserId(id, (err, useritems)=>{
    return useritems.length;
  })
}

const getCartPrice = async (id) => {
  UserItem.getNumberOfItemsInCartByUserId(id, (err, useritems)=>{
    var price = 0;
    var counter = 0;
    for(i=0;i<useritems.length;i++){
      Item.getItemById(useritems[i].item_id,(err, item)=>{
        price += item.price;
        if(counter == useritems.length - 1) {
          return price;
        }
        counter++;
      })
    }
  })
}

module.exports.getCartPrice = getCartPrice;
module.exports.getCartRow = getCartRow;
module.exports.getWishRow = getWishRow;
