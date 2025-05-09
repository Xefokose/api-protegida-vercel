import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const dados = [];
    const querySnapshot = await getDocs(collection(db, "estreias")); // troque "estreias" pelo nome real da sua coleção
    querySnapshot.forEach((doc) => {
      dados.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar dados", detalhe: error.message });
  }
}