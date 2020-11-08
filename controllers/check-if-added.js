const check_if_added_to_cart = (useritems, itemId) => {
	var counter = 0;
	useritems.forEach((uitem)=>{
		if((uitem.item_id == itemId)&&(uitem.status == 'Added to cart')){
			return true;
		}
		if(counter == useritems.length - 1){
			return false;
		}
		counter++;
	})
}
const check_if_added_to_wish = (useritems, itemId) => {
	var counter = 0;
	useritems.forEach((uitem)=>{
		if((uitem.item_id == itemId)&&(uitem.status == 'Added to wish')){
			return true;
		}
		if(counter == useritems.length - 1){
			return false;
		}
		counter++;
	})
}
module.exports.check_if_added_to_cart = check_if_added_to_cart;
module.exports.check_if_added_to_wish = check_if_added_to_wish;