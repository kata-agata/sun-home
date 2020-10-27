const {MongoClient} = require('mongodb');

async function main() {
  const uri = 'mongodb+srv://admin:Starlight30@cluster0.sepqc.mongodb.net/sample_restaurants?retryWrites=true&w=majority'
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
  try{
    await client.connect(); // returns promise
  } catch (e){
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.err);
