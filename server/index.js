const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const booksRoutes = require('./router/books.router');
const { mongoose } = require('mongoose');

const PORT = 8080 || process.env.PORT
const uri = "mongodb+srv://aditya190072:2M1pcxOELXp3kXxQ@cluster0.obbnazb.mongodb.net/?retryWrites=true&w=majority";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

app.use(booksRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});