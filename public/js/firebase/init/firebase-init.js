export async function initFirebaseCompat() {
  const res = await fetch('/api/firebase-config');
  const config = await res.json();
  firebase.initializeApp(config);
}