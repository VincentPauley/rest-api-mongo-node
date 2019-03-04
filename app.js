require('dotenv').config();

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const cors = require( 'cors' );

const ingredient = require('./routes/ingredient.route');

mongoose.connect(`mongodb://${ process.env.DB_USER }:${ process.env.DB_PASS }@${ process.env.DB_HOST }:${ process.env.DB_HOST }/cooking?authSource=admin`, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on( 'error', console.error.bind( console, 'MongoDb connection error:' ));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use( '/ingredients', ingredient );

let port = 3000;

app.listen( port, () => {

    console.log( 'Server running on *' + port );
});
