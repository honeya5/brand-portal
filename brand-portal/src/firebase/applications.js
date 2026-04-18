import { collection, addDoc, query, where, onSnapshot, updateDoc, doc, getDocs } from 'firebase/firestore'
import { db } from './config'

export async function submitApplication(brandId, customerId, data) {
  await addDoc(collection(db, 'applications'), {
    brandId, customerId, ...data,
    status: 'pending',
    createdAt: Date.now()
  })
}

export function listenToApplications(brandId, callback) {
  const q = query(collection(db, 'applications'), where('brandId', '==', brandId))
  return onSnapshot(q, snap => {
    const apps = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    callback(apps)
  })
}

export async function getMyApplications(customerId) {
  const q = query(collection(db, 'applications'), where('customerId', '==', customerId))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function updateApplicationStatus(appId, status) {
  await updateDoc(doc(db, 'applications', appId), { status })
}