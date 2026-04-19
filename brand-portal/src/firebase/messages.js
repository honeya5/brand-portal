import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from './config'

export async function sendMessage(applicationId, senderId, senderName, text) {
  await addDoc(collection(db, 'messages'), {
    applicationId,
    senderId,
    senderName,
    text,
    createdAt: Date.now()
  })
}

export function listenToMessages(applicationId, callback) {
  const q = query(
    collection(db, 'messages'),
    where('applicationId', '==', applicationId),
    orderBy('createdAt', 'asc')
  )
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}