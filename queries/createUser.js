function createUser(username, password, role){

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rajataggarwal91:a0E5Whe2KS@cluster0-ady4o.mongodb.net/SSMainData?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      // perform actions on the collection object
      client.close();
    });
}
createUser("uname","pass","student");
