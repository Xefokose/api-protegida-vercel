export default async function handler(req, res) {
  const termo = (req.query.termo || "").toLowerCase();

  const URL_FIREBASE = "https://firestore.googleapis.com/v1/projects/calendario-estreias/databases/(default)/documents/estreias";

  try {
    const response = await fetch(URL_FIREBASE);
    const data = await response.json();

    const filtrados = data.documents?.filter(doc =>
      doc.fields?.titulo?.stringValue.toLowerCase().includes(termo)
    );

    res.status(200).json(filtrados || []);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar dados", detalhe: error.message });
  }
}
