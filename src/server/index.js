const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const os = require('os')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'))

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
})

app.post('/api/world', (req, res) => {
  console.log(req.body)
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  )
})

app.get('/api/ingredients', (req, res) => {
  axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then(response => {
      let ingredients = response.data.drinks.map(
        ingr => ingr['strIngredient1']
      )
      res.send({ ingredients })
    })
    .catch(error => {
      res.send({ error })
    })
})

app.get('/api/search', (req, res) => {
  // Check if request is well formed
  if (typeof req.query.i === "undefined" || req.query.i.length === 0) {
    res.send("malformed search")
  }
  let ingredients = req.query.i.split(",")

  let drinkIds = []
  let promises = []
  // Create api request for each ingredient search
  ingredients.forEach(ingr => {
    promises.push(axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingr}`))
  })
  // wait for promise on all constructed requests
  axios.all(promises).then(results => {
    results.forEach(response => {
      let ids = []
      response.data.drinks.forEach(drink => {
        ids.push({id: drink.idDrink, ingredients: [response.config.url.split("=")[1]]})
      })
      drinkIds.push(ids)
    })
  })
    .then(() => {
      // Flatten array, merge duplicate ids, sort by most ingr
      drinkIds = [].concat(...drinkIds)

      drinkIds = drinkIds.reduce((o, cur) => {
        // Get the index of the key-value pair.
        var occurs = o.reduce((n, item, i) => {
          return (item.id === cur.id) ? i : n;
        }, -1);
        // If the name is found,
        if (occurs >= 0) {
          // append the current value to its list of values.
          o[occurs].ingredients = o[occurs].ingredients.concat(cur.ingredients);
          // Otherwise,
        } else {
          // add the current item to o (but make sure the value is an array).
          var obj = {
            id: cur.id,
            ingredients: cur.ingredients
          };
          o = o.concat([obj]);
        }
        return o;
      }, []);

      res.send(drinkIds)
    })

})

app.get('/api/cocktail/:id', (req, res) => {
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${req.params.id}`)
    .then(response => {
      res.send(response.data.drinks[0])
    })
    .catch(error => {
      res.send({ error })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
