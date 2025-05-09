import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS || '{}');

if (!global._firebaseAppInitialized) {
  initializeApp({
    credential: cert(firebaseConfig)
  });
  global._firebaseAppInitialized = true;
}

const db = getFirestore();

export default async function handler(req, res) {
  try {
    const dados = [];
    const snapshot = await db.collection("estreias").get(); // Troque se o nome da coleção for outro
    snapshot.forEach(doc => {
      dados.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(dados);
  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ erro: "Erro ao buscar dados", detalhe: error.message });
  }
}