var express = require('express');
var router = express.Router();

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');



/*Creating a new user*/
router.get('/createuserIfAbsent',function(req,res,next){
  req.db.collection('allergens').find().toArray(function(err, results){
      console.log("User in db earlier" + results);
      if(results.length == 0){ //If no user
          results =  {
          "name": String(req.headers['username']),
          "allergens":[]
        }

        console.log("User not in db ... creating user" + results);
        req.db.collection('allergens').insert(results,function(err,documents){
          console.log('User ' + req.headers['username'] + 'created successfuly');
        //  res.send("User Created");
        });
      }else{
        //  res.send("User Already Present");
      }
    });
});

/*GET all cards as JSON */
router.get('/allergens', function(req, res, next) {
  //console.log(req.headers['username']);
  //console.log('auth0 user id:', req.user.sub);

  req.db.collection('allergens').find().toArray(function(err,results){
    if(err){
      next(err);
    }
    if(results.length==0){
      res.send([]);
    }else{
      res.send(results[0].allergens);
    }
    console.log("These are cards for user  " + JSON.stringify(results[0].allergens));
  });
});

// /allergens/${allergenName}

//changing the status of cards
router.put('/allergens/:allergenName', function(req, res, next){
  req.db.collection('allergens').updateOne({ "allergens.allergen_name": req.params.allergenName},
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

module.exports = router;
