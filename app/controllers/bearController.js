const mongoose = require('mongoose');
const Bear = mongoose.model('Bear');



exports.list_all_bears = function(req, res) {
  if(req.query.bear_name){  
    Bear.findOne({name: req.query.bear_name}, function(err, bear) {
      if (err)
          res.send(err);
      res.json(bear);
  });}
  else{
  Bear.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};}

exports.create_a_bear= function(req, res) {
    req.checkBody({
        name: {
          isAlpha: true,
          isLength: {
            options: [{ min: 2, max: 50 }],
            errorMessage: 'Name must be between 2 and 50 characters.'
          },
          errorMessage: 'Name must have only alphabetical characters.'
        }
      });
    
      const errors = req.validationErrors();
    
      if (errors) {
         res.status(400).json(
         errors
        );
      }

    var new_bear = new Bear(req.body);
    new_bear.save(function(err, bear) {
      if (err)
          res.send(err);
      res.json(bear);
    });
  };

exports.get_a_bear = function(req, res) {
 
  Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    });
  
  };
  

  exports.update_a_bear = function(req, res) {
    Bear.findOneAndUpdate({ _id: req.params.bear_id }, req.body, { new: true }, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  };
  exports.delete_a_bear = function(req, res) {

    Task.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({ message: 'Bear successfully deleted' });
    });
  };
  