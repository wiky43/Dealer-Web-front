const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ⚠️ Simulación de base de datos en memoria
const users = [];

// Registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ success: false, message: 'El usuario ya existe.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, email, passwordHash });

  return res.json({ success: true });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
  }

  return res.json({ success: true });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});