const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Receitas com Categorias Adicionadas
const receitas = [
    { 
        id: 0, 
        nome: 'Cupcake de Chocolate', 
        categoria: 'sobremesa',
        imagem: '/img/cupcake.jpg', 
        dificuldade: 'Média', 
        ingredientes: ['Farinha', 'Cacau em pó', 'Ovos', 'Açúcar'],
        preparo: 'Misture os secos, adicione os líquidos e asse por 20 min.'
    },
    { 
        id: 1, 
        nome: 'Cocada Cremosa', 
        categoria: 'sobremesa',
        imagem: '/img/cocada.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['Coco ralado', 'Leite condensado', 'Leite'],
        preparo: 'Leve ao fogo baixo mexendo sempre até engrossar.'
    },
    { 
        id: 2, 
        nome: 'Pudim de Leite', 
        categoria: 'sobremesa',
        imagem: '/img/pudim.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['Leite condensado', 'Leite', 'Ovos', 'Açúcar para a calda'],
        preparo: 'Bata no liquidificador e asse em banho-maria.'
    },
    { 
        id: 3, 
        nome: 'Pavê de Chocolate', 
        categoria: 'sobremesa',
        imagem: '/img/pave.jpg', 
        dificuldade: 'Média', 
        ingredientes: ['Biscoito champagne', 'Chocolate', 'Creme de leite'],
        preparo: 'Faça camadas de biscoito umedecido e creme de chocolate.'
    },
    { 
        id: 4, 
        nome: 'Bolo de Chocolate', 
        categoria: 'bolo',
        imagem: '/img/chocolate.jpg', 
        dificuldade: 'Média', 
        ingredientes: ['3 ovos', '2 xícaras de farinha', '1 xícara de açúcar', '1 xícara de chocolate em pó', '1 xícara de leite', '1 colher de fermento'],
        preparo: 'Bata os ovos com o açúcar, adicione o leite e a farinha. Por último, o chocolate e o fermento. Asse por 40 minutos.'
    },
    { 
        id: 5, 
        nome: 'Bolo de Laranja', 
        categoria: 'bolo',
        imagem: '/img/laranja.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['1 laranja inteira', '1 xícara de óleo', '3 ovos', '2 xícaras de farinha', '2 xícaras de açúcar', '1 colher de fermento'],
        preparo: 'Bata a laranja, o óleo e os ovos no liquidificador. Misture com a farinha e o açúcar. Adicione o fermento e asse.'
    },
    { 
        id: 6, 
        nome: 'Bolo da Moça', 
        categoria: 'bolo',
        imagem: '/img/moça.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['1 lata de leite condensado', 'mesma medida de leite', '3 ovos', '3 colheres de açúcar', '1 xícaras de farinha', '2 colheres de manteiga'],
        preparo: 'Bata tudo no liquidificador. Despeje em forma untada e asse em forno médio até ficar firme.'
    },
    { 
        id: 7, 
        nome: 'Croquete de Queijo', 
        categoria: 'salgado',
        imagem: '/img/croquete.jpg', 
        dificuldade: 'Média', 
        ingredientes: ['500g de queijo muçarela ralado', '1 xícara de leite', '2 colheres de farinha de trigo', 'Ovos e farinha de rosca para empanar'],
        preparo: 'Faça uma massa cozida com leite e farinha, misture o queijo, modele, empane e frite em óleo quente.'
    },
    { 
        id: 8, 
        nome: 'Pastel de Forno', 
        categoria: 'salgado',
        imagem: '/img/pastel.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['2 xícaras de farinha de trigo', '100g de manteiga', '1 caixa de creme de leite', 'Sal a gosto', 'Recheio de sua preferência'],
        preparo: 'Misture a farinha, manteiga e creme de leite até desgrudar das mãos. Abra a massa, recheie e asse por 25 min.'
    },
    { 
        id: 9, 
        nome: 'Empada', 
        categoria: 'salgado',
        imagem: '/img/empada.jpg', 
        dificuldade: 'Média', 
        ingredientes: ['3 xícaras de farinha de trigo', '150g de manteiga gelada', '1 ovo', 'Sal', 'Recheio de frango ou palmito'],
        preparo: 'Misture a farinha com a manteiga até formar uma farofa. Adicione o ovo para dar liga. Forre as forminhas, recheie e asse.'
    },
    { 
        id: 10, 
        nome: 'Pão de Queijo', 
        categoria: 'salgado',
        imagem: '/img/queijo.jpg', 
        dificuldade: 'Fácil', 
        ingredientes: ['500g de polvilho doce', '300g de queijo minas curado', '3 ovos', '1 xícara de leite', 'meia xícara de óleo'],
        preparo: 'Ferva o leite com o óleo e escalde o polvilho. Espere esfriar, adicione os ovos e o queijo. Modele as bolinhas e asse.'
    }
];

// Rota principal com Lógica de Filtro
app.get('/', (req, res) => {
    const categoriaSelecionada = req.query.categoria;
    let receitasExibidas = receitas;

    if (categoriaSelecionada) {
        receitasExibidas = receitas.filter(r => r.categoria === categoriaSelecionada);
    }

    res.render('home', { receitas: receitasExibidas });
});

// Rota de detalhes
app.get('/receita/:id', (req, res) => {
    const idReceita = req.params.id;
    const receitaSelecionada = receitas.find(r => r.id == idReceita);

    if (receitaSelecionada) {
        res.render('detalhe', { receita: receitaSelecionada });
    } else {
        res.status(404).send('Receita não encontrada!');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});