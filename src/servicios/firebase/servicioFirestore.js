import { collection, doc, serverTimestamp } from "firebase/firestore";
import { assertFirebaseConfigured, db } from "../../config/firebase.js";

export const COLLECTIONS = Object.freeze({
  users: "users",
  orders: "orders",
  inventory: "inventory",
  dailyPlans: "dailyPlans",
  dispatchRoutes: "dispatchRoutes",
  auditLogs: "auditLogs",
});

function getDbInstance() {
  assertFirebaseConfigured();
  return db;
}

export function getCollectionRef(collectionName) {
  return collection(getDbInstance(), collectionName);
}

export function getDocumentRef(collectionName, documentId) {
  return doc(getDbInstance(), collectionName, documentId);
}

export { serverTimestamp };
