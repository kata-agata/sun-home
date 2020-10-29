const {MongoClient} = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://admin:Starlight30@cluster0.sepqc.mongodb.net/test?retryWrites=true&w=majority'
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
  try{
    await client.connect(); // returns promise
    await createListing(
      client,
      {
        name: "Lovelu Loft",
        summary: "Charming ones",
        bedrooms: 1,
        bathrooms: 1
      }
    );
  } catch (e){
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);

async function createListing(client, newListing) {
  const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
  console.log(`new listing created with ${result.insertedId}`);
}

async function listDatabases(client){
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach( db => console.log(` - ${db.name}`));
}
