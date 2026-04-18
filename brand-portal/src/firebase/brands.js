import { collection, doc, addDoc, updateDoc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from './config'

export async function createBrand(uid, data) {
  const ref = await addDoc(collection(db, 'brands'), { ...data, ownerId: uid, createdAt: Date.now() })
  return ref.id
}

export async function updateBrand(brandId, data) {
  await updateDoc(doc(db, 'brands', brandId), data)
}

export async function getBrands() {
  const snap = await getDocs(collection(db, 'brands'))
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function getBrandById(id) {
  const snap = await getDoc(doc(db, 'brands', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function getBrandByOwner(uid) {
  const q = query(collection(db, 'brands'), where('ownerId', '==', uid))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() }
}