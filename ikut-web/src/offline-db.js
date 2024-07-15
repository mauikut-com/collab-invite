import { addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

addRxPlugin(RxDBDevModePlugin);

let dbPromise = null;

const schema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100 // <- the primary key must have set maxLength
    },
    title: {
      type: 'string'
    },
    start: {
      type: 'string',
      format: 'date-time'
    }
  },
  required: ['id', 'title', 'start']
}


// async function dbInit() {  // ??
const dbInit = async () => {
  const db = await createRxDatabase({
    name: 'calendar_events',
    storage: getRxStorageDexie()
  });

  await db.addCollections({
    "calendar_events": { schema }
  });

  // // insert list of events, use them at FullCalendar
  // const unused = await db["calendar_events"].upsert({
  //     id: 'todo1',
  //     title: 'Cal Event',
  //     start: new Date().toISOString()
  // });
  // const unused2 = await db["calendar_events"].upsert({
  //     id: 'todo2',
  //     title: 'Cal Event Two',
  //     start: new Date().toISOString()
  // });

  return db
}

export const init = () => {
  if (!dbPromise) {
    dbPromise = dbInit();
  }
  return dbPromise;
};

// // const unused = await db["calendar_events"].insert({
// //     id: 'todo1',
// //     title: 'Learn jjjjjj',
// //     start: new Date().toISOString()
// // });
