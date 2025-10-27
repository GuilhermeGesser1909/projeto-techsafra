// Importa o módulo nativo 'http'
const http = require("http");

// Define a porta e cria o servidor
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Servidor Node.js puro rodando! 🚀");
});

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
