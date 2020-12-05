const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handle bars engine, views & partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve up
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', ({
        title: 'Weather',
        creator: 'Prasad'
    }))
})

app.get('/about', (req, res) => {
    res.render('about', ({
        title: 'Weather',
        creator: 'Prasad'
    }))
})

app.get('/help', (req, res) => {
    res.render('help', ({
        title: 'Weather',
        creator: 'Prasad',
        helpText: 'Some Helpful Text'
    }))
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Please enter search criteria'
        })
    }
    console.log(req.query.search);
    res.send({
        Products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please enter address'
        })
    } else {
        forecast(req.query.address, (error, body) => {
            if (error) {
                res.send({
                    error: error
                })
            } else if(body) {
                res.send({
                    location: req.query.address,
                    forecast: body
                })
            } else {
                res.send({
                    body: 'Weather could not be fetched'
                })
            }
        })
    }    
})

app.get('/help/*', (req, res) => {
    res.send('Help Page Not Found')
})

app.get('*', (req, res) => {
    res.send('404: Page Not Found')
})

//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})