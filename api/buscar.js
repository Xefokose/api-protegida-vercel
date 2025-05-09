import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Caminho da chave
const serviceAccount = JSON.parse(fs.readFileSync('./chave-firebase.json', 'utf8'));

// Inicializa o Firebase Admin
if (!global._firebaseAppInitialized) {
  initializeApp({
    credential: cert(serviceAccount)
  });
  global._firebaseAppInitialized = true;
}

const db = getFirestore();

export default async function handler(req, res) {
  try {
    const dados = [];
    const snapshot = await db.collection("estreias").get(); // Substitua pelo nome correto da sua coleção
    snapshot.forEach(doc => {
      dados.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar dados", detalhe: error.message });
  }
}
