import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "./config"

export async function signUp(email, password, displayName, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })
    
    // Save user role to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      displayName,
      role, // "business" or "customer"
      createdAt: new Date().toISOString()
    })
    
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function logout() {
  await signOut(auth)
}