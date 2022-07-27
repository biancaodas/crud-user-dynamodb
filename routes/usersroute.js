const express = require('express');
const router = express.Router();
const { salvar, remover, alterar } = require('../database/userdb');

router.post('/', async (req, res) => {
    if (req.body && req.body.email && req.body.nome && req.body.senha) {
        const cadastro = await salvar(req.body);
        return res.send(cadastro);
    }

    return res.status(500).json({mensagem: 'Usuário não cadastrado'});
});

router.delete('/', async (req, res) => {
    if(validarRequestBody(req)) {
        const sucesso = await remover(req.body.id, req.body.email);
        return res.send({sucesso: sucesso});
    }
    
    return res.status(404).json({mensagen: 'Usuário não encontrado'});
})

router.put('/', async(req, res) => {
    if(validarRequestBody(req)){
        const dados = await alterar(req.body);
        return res.send(dados);
    }

    return res.status(404).json({mensagem: 'Usuário não encontrado'});
});

function validarRequestBody(request) {
    return request.body && request.body.id && request.body.email;
}

module.exports = router;