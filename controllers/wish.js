const UserItem = require('../models/userItem');

module.exports.wishAdd = async (userid, itemid) => {
		const addItem = new UserItem({
			user_id: userid,
			item_id: itemid,
			status: 'Added to wish'
		});
		const item = await addItem.save();
		if (!item) throw Error('Something went wrong saving the item');
}

module.exports.wishRemove = async (userid, itemid) => {
	const deleteItem = new UserItem({
		user_id: userid,
		item_id: itemid
	});
	const item = await deleteItem.deleteOne();
	if (!item) throw Error('Something went wrong deleting the item');
}

module.exports.wishUpdate = async (userid, itemid) => {
	const updateItem = new UserItem({
		user_id: userid,
		item_id: itemid,
		status: 'Added to wish'
	});
	const item = await updateItem.updateOne();
	if (!item) throw Error('Something went wrong deleting the item');
}