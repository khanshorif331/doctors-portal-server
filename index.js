const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m0h6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

async function run() {
	try {
		await client.connect()
		console.log('Database Connected')
		const serviceCollection = client
			.db('doctors_portal')
			.collection('services')
		const bookingCollection = client
			.db('doctors_portal')
			.collection('bookings')

		app.get('/service', async (req, res) => {
			const query = {}
			const cursor = serviceCollection.find(query)
			const services = await cursor.toArray()
			res.send(services)
		})

		/*****
		 * API naming coonvention
		 * app.get('/booking)  //get all boookings in this collection or get more than one or by filter
		 * app.get('/booking/:id) //get a specific element by id
		 * app.post('/booking)  // add a new booking data
		 * app.patch('/booking/:id')  // update specific element
		 * app.delete('/booking/:id')  // delete specific element
		 *
		 *
		 * ****/

		app.post('/booking', async (req, res) => {
			const booking = req.body
			const query = {
				treatment: booking,
				date: booking.date,
				patient: booking.patient,
			}
			const result = await bookingCollection.insertOne(booking)
			res.send(result)
		})
	} finally {
	}
}
run().catch(console.dir)

app.get('/', (req, res) => {
	res.send('Hello from doctor uncle')
})

app.listen(port, () => {
	console.log('Doctoors app Listening to port', port)
})
