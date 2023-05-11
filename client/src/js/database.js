import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database 
// put is for updating, post for adding ^ TODO is to add to db, so changed to postDb and store.add()
export const postDb = async (content) => {
  
  // Create connection to initiated DB 'jate', version 1
  const connectDb = await openDB('jate', 1);

  // Create new transaction to jate database, specify 'readwrite' access to make changes to db
  const dbTx = connectDb.transaction('jate', 'readwrite');

  // Open new object store within db
  const objStore = dbTx.objectStore('jate');

  // Use add method on the store oject to pass in and create the content 
  const request = store.add({ value: content})

  // Confirm request to add to db went through 
  const result = await request;
  console.log('Data successfully saved to DB: ' + result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create connection to initiated DB 'jate', v 1
  const connectDb = await openDB('jate', 1);

  // Create new transaction to jate database, specify 'readonly' access to perform get request
  const dbTx = connectDb.transaction('jate', 'readonly');

  // Open object store within jate db
  const objStore = dbTx.objectStore('jate');

  // Use getAll method to request everything in db store 
  const request = store.getAll();

  // Confirm request to get all data 
  const result = await request;
  console.log('Data successfully retrieved');
  return result;  
};

initdb();
