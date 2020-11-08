const UserItem = require('../models/userItem');

module.exports.cartAdd = async (userid, itemid) => {
		console.log(typeof(itemid));
		const addItem = new UserItem({
			user_id: userid,
			item_id: itemid,
			status: 'Added to cart'
		});
		const item = await addItem.save();
		if (!item) throw Error('Something went wrong saving the item');
}

module.exports.cartRemove = async (userid, itemid) => {
	const deleteItem = new UserItem({
		user_id: userid,
		item_id: itemid
	});
	const item = await deleteItem.deleteOne();
	if (!item) throw Error('Something went wrong deleting the item');
}

module.exports.cartUpdate = async (userid, itemid) => {
	const updateItem = new UserItem({
		user_id: userid,
		item_id: itemid,
		status: 'Added to cart'
	});
	const item = await updateItem.updateOne();
	if (!item) throw Error('Something went wrong deleting the item');
}