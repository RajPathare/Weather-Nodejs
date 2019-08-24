const path = require('path');
const express = require('express');
const hbs = require('hbs'); //no need to require hbs for app.set view engine -> hbs
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express() // pass the express func to a variable, so we can directly use the var

const port = process.env.PORT || 3000; // heroku uses process.env.PORT variable. If it doesn't exists, choose port 3000
// to run it on out localhost

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views'); // hbs files are meant to be stored in the views directory,
// if we need to change the dir name to something like -> templates, pass the path to a const -> viewsPath
// and then use app.set
const partialsPath = path.join(__dirname,'../templates/partials'); // partials are used for setting up things that do not
// change in a website -> eg -> footers,headers. Partials are just a part of a webpage


// setup handlebars engine and views location
app.set('view engine','hbs'); // setting the view engine as hbs (hbs -> npm package for express to render dynamic content)
app.set('views', viewsPath); // set views path to viewsPath
hbs.registerPartials(partialsPath); // for configuring partials

// setup static directory to use--> localhost:3000/index.html // /about.html (will lookup html in the public directory)
app.use(express.static(publicDirectoryPath)); // customize the server

// static - renders static webpages. Only used if we want to serve static webpages

// res.render - for serving up dynamic content - .hbs file - dynamic content.. replace the index.html with index.hbs and put it in the views folder

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weatherlive!',
        name: 'Raj'
    });
});


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Raj'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Working',
        name: 'Raj'
    });

})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
                                                                    // default parameter if nothing is passed 
                                                                    // similar to setting a default value for a var
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error)
        {
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude,(error,forecastData,tom)=>{
            if(error)
            {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location, // similar to location: location (new style)
                address: req.query.address,
                week: tom

            })

        });
        
    })

    //console.log(req.query.address); // req.query.address -> gets address from browser link -> localhost:3000/weather?address=India
    // here, address = key and India = value. To get India, we use -> req.query.address
})

app.get('/products', (req,res)=>{
    //console.log(req.query); // req is used for getting something from the browser into our application

    //we can't send two responses to the client.. use res.send only once in one route eg -> /products

    if(!req.query.search){
       return res.send({  // return stops the execution and hence the next res.send does not run. We can also use else if
        //we want to stop executing two res.send
            error: 'Please provide a search term'
        });
    }
    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Raj',
        errorMessage: 'Help data not found'
    });

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Raj',
        errorMessage: 'Page not found'
    });

})

app.listen(port, ()=>{
    console.log("Server is running on port "+ port);
});

