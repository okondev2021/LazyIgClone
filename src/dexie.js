import Dexie from "dexie";

export const db = new Dexie('MyDatabase');
db.version(2).stores({
    bio: ', name, about',
    gallery: '++id, url',
});