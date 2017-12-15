var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');



/*Creating a new user*/
router.get('/createuser',function(req,res,next){
  console.log(req.headers['username']);
  req.db.collection('allergens').find({"name": req.headers['username']}).toArray(function(err, results){
      console.log("User in db earlier" + results);
      if(results.length == 0){ //If no user
          results =  {
          "name": String(req.headers['username']),
          "allergens":default_data
        }

        console.log("User not in db ... creating user" + results);
        req.db.collection('allergens').insert(results,function(err,documents){
        console.log('User ' + req.headers['username'] + 'created successfuly');
        //  res.send("User Created");
        });
      }else{
        console.log("User Already Present");
      }
    });
});

/*GET all cards as JSON */
router.get('/allergens', function(req, res, next) {
  //console.log(req.headers['username']);

  req.db.collection('allergens').find({"name": req.headers['username']}).toArray(function(err,results){
    if(err){
      next(err);
    }
    if(results.length==0){
      res.send([]);
    //  console.log("allergens list is empty");
    }else{
      res.send(results[0].allergens);
    //  console.log("These are allergens for user  " + JSON.stringify(results[0].allergens));
    }

  });
});


//changing the status of allergen Checkbox
router.put('/allergens/:allergenName', function(req, res, next){
  console.log(req.headers['username']);
  req.db.collection('allergens').updateOne({"name": req.headers['username'],  "allergens.allergen_name": req.params.allergenName},
      {
        "$set":
          {"allergens.$.selected": req.body.done}
      }, function (err, documents) {
        res.send({ error: err, affected: documents });
    });
});

//dummy route
router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  console.log();
  res.send(foo);
});

//Required for new user.
var default_data = [{
		"allergen_name": "Cereals",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/rice-crispy-cereal.png"
	},
	{
		"allergen_name": "Shellfish",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/fish-fillet.jpg"
	}, {
		"allergen_name": "Egg",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/egg.jpg"
	}, {
		"allergen_name": "Fish",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/fish-fillet.jpg"
	}, {
		"allergen_name": "Milk",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"
	}, {
		"allergen_name": "Peanuts",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/peanuts.png"
	}, {
		"allergen_name": "Sulfites",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/no.jpg"
	}, {
		"allergen_name": "Tree Nuts",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/nuts-mixed.jpg"

	}, {
		"allergen_name": "Soybean",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/chickpea-flour-or-another-gluten-free-flour.jpg"

	}, {
		"allergen_name": "Sesame Seeds",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.jpg"

	}, {
		"allergen_name": "Gluten",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/seitan.jpg"

	}, {
		"allergen_name": "Lactose",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"

	}, {
		"allergen_name": "Corn",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/corn.png"
	}, {
		"allergen_name": "Wheat",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/whole-wheat-chex.jpg"
	}, {
		"allergen_name": "Coconut",
		"selected": false,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/coconut.jpg"
	}
];

module.exports = router;
