const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

const plantas = [
    { id: 1, nome: 'Alecrim - Planta Natural', preco: "5,90", imagemUrl: 'https://www.cobasi.com.br/arquivos/ids/1057062-200-200/Alecrim-PT11.png' },
    { id: 2, nome: 'Spathiphyllum - Lírio da Paz', preco: "12,90", imagemUrl: 'https://www.cobasi.com.br/arquivos/ids/1057202-200-200/Spathiphyllum-PT11.png' },
    { id: 3, nome: 'Arruda - Planta Natural', preco: "5,90", imagemUrl: 'https://www.cobasi.com.br/arquivos/ids/1057066-200-200/Arruda-PT11.png' },
    { id: 4, nome: 'Orquídea Denphalaen', preco: "21,90", imagemUrl: 'https://www.cobasi.com.br/arquivos/ids/1069674-200-200/Orquidea-Denphalaen-Mini-Pote-12-Quadrado.webp' }
];

app.get('/', (req, res) => {
    res.render('home', { plantas });
});


app.get('/carrinho', (req, res) => {
    const produto = {
        nome: req.query.nome,
        preco: req.query.preco,
        imagem: req.query.imagem 
    };
    res.render('carrinho', { produto });
});


app.listen(3000, () => console.log("Servidor rodando em: http://localhost:3000"));