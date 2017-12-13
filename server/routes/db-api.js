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
  console.log(req.headers['username']);
  //console.log('auth0 user id:', req.user.sub);

  req.db.collection('allergens').find({"name": req.headers['username']}).toArray(function(err,results){
    if(err){
      next(err);
    }
    if(results.length==0){
      res.send([]);
      console.log("allergens list is empty");
    }else{
      res.send(results[0].allergens);
      console.log("These are allergens for user  " + JSON.stringify(results[0].allergens));
    }

  });
});

// /allergens/${allergenName}
//allergens/${allergenName}

//changing the status of cards
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

router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  console.log();
  res.send(foo);
});


// simple API call, no authentication or user info
router.get('/unprotected', function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

});

// checkJwt middleware will enforce valid authorization token
router.get('/protected', checkJwt, function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

  // the auth0 user identifier for connecting users with data
  console.log('auth0 user id:', req.user.sub);

  // fetch info about the user (this isn't useful here, just for demo)
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

});

var default_data = [{
		"allergen_name": "Cereals",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/rice-crispy-cereal.png"
	},
	{
		"allergen_name": "Shellfish",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/fish-fillet.jpg"
	}, {
		"allergen_name": "Egg",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/egg.jpg"
	}, {
		"allergen_name": "Fish",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/fish-fillet.jpg"
	}, {
		"allergen_name": "Milk",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"
	}, {
		"allergen_name": "Peanuts",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/peanuts.png"
	}, {
		"allergen_name": "Sulfites",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/no.jpg"
	}, {
		"allergen_name": "Tree Nuts",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/nuts-mixed.jpg"

	}, {
		"allergen_name": "Soybean",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/chickpea-flour-or-another-gluten-free-flour.jpg"

	}, {
		"allergen_name": "Sesame Seeds",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/sesame-seeds.jpg"

	}, {
		"allergen_name": "Gluten",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/seitan.jpg"

	}, {
		"allergen_name": "Lactose",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/milk.jpg"

	}, {
		"allergen_name": "Corn",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/corn.png"
	}, {
		"allergen_name": "Wheat",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/whole-wheat-chex.jpg"
	}, {
		"allergen_name": "Coconut",
		"selected": true,
		"image": "https://spoonacular.com/cdn/ingredients_100x100/coconut.jpg"
	}
];

module.exports = router;
