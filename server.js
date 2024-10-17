const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgG6pYQtz7ddIxaU_mnlXRX6mv397Lp9g",
  authDomain: "fontanari123-dcf62.firebaseapp.com",
  databaseURL: "https://fontanari123-dcf62-default-rtdb.firebaseio.com",
  projectId: "fontanari123-dcf62",
  storageBucket: "fontanari123-dcf62.appspot.com",
  messagingSenderId: "634070630853",
  appId: "1:634070630853:web:798302a31418d228110bac"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML e JS do front-end)
app.use(express.static('public'));

// Rota para obter a contagem de votos
app.get('/votos', (req, res) => {
  database.ref('votos').once('value', (snapshot) => {
    const votos = snapshot.val() || { esquerda: 0, direita: 0 };
    res.json(votos);
  });
});

// Rota para registrar voto
app.post('/votar', (req, res) => {
  const lado = req.body.lado; // 'esquerda' ou 'direita'

  // Verificar o lado e atualizar o voto
  const votoRef = database.ref(`votos/${lado}`);

  votoRef.transaction((votosAtuais) => {
    return (votosAtuais || 0) + 1;
  }).then(() => {
    res.sendStatus(200);
  }).catch((error) => {
    console.error("Erro ao registrar o voto: ", error);
    res.sendStatus(500);
  });
});

// Rota para resetar a contagem de votos
app.get('/resetar-votos', (req, res) => {
    database.ref('votos').set({
      esquerda: 0,
      direita: 0
    }).then(() => {
      res.send('Votos resetados com sucesso!');
    }).catch((error) => {
      console.error("Erro ao resetar votos: ", error);
      res.status(500).send('Erro ao resetar votos.');
    });
  });
  


// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
