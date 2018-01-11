module.exports = function(app) {
	var bearController = require('../controllers/bearController');
	app.route('/')
		.get(function(req, res) {
		res.status(200);
		res.json({ message: 'hooray! welcome to our api!' });	
	});
	// todoList Routes
	app.route('/bears')
		.get(bearController.list_all_bears)
		.post(bearController.create_a_bear);

	app.route('/bears/:bear_id')
		.get(bearController.get_a_bear)
		.put(bearController.update_a_bear)
		.delete(bearController.delete_a_bear);
};
