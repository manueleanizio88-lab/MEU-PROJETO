const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const plantas = [
    { id: 1, nome: 'Comigo Ninguém Pode', preco: "55,00", imagem: '' },
    { id: 2, nome: 'Flor do Deserto', preco: "150,00", imagem: '' },
    { id: 3, nome: 'Capim Santo', preco: "25,00", imagem: '' },
    { id: 4, nome: 'Espada de São Jorge', preco: "45,00", imagem: '/' },
    { id: 5, nome: 'Samambaia', preco: "60,00", imagem: '' },
    { id: 6, nome: 'Girassol', preco: "30,00", imagem: '' },
    { id: 7, nome: 'Cacto-bola', preco: "20,00", imagem: '' },
    { id: 8, nome: 'Orquídea', preco: "120,00", imagem: '' }
];


app.get('/', (req, res) => {
    res.render('home', { plantas });
});

app.listen(3000, () => console.log("Plantas rodando em: http://localhost:3000"));