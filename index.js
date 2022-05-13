const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const uri =
	'mongodb+srv://process.env.DB_USER:process.env.DB_PASS@cluster0.m0h6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})
client.connect(err => {
	const collection = client.db('test').collection('devices')
	// perform actions on the collection object
	client.close()
})

app.get('/', (req, res) => {
	res.send('Hello from doctor uncle')
})

app.listen(port, () => {
	console.log('Doctoors app Listening to port', port)
})
