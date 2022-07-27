const crypto = require('crypto');
const AWS = require('aws-sdk');
const {encrypt, getSenhaDecrypt} = require ('../utils/crypto');
const { AwsConfig } = require('../config/credentials');
const { table } = require('console');

const tableName = 'users';
AWS.config.update(AwsConfig);
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function salvar (bodyRequest) {
    const senhaEncrypt = encrypt(bodyRequest.senha);

    bodyRequest.id = crypto.randomBytes(32).toString('hex');
    bodyRequest.ativo = true;
    bodyRequest.dataCadastro = new Date().toString();
    bodyRequest.senha = senhaEncrypt;

    var params = {
        TableName: tableName,
        Item: bodyRequest
    };

    try {
        await dynamoDb.put(params).promise();
        return bodyRequest;
    } catch(err) {
        console.log('Err', err);
        return null;
    }
}

async function remover(id, email) {
    var params = {
        TableName: tableName,
        Key: {
            id: id, 
            email: email,
        }
    }

    try {
        await dynamoDb.delete(params).promise();
        return true;
    } catch (err) {
        console.log('err', err);
        return false;
    }
}

async function alterar(user) {
    var params = {
        TableName: tableName,
        Key: {"id": user.id, "email": user.email},
        UpdateExpression: "set nome = :nome",
        ExpressionAttributeValues: {
            ":nome": user.nome,
        },
        ReturnValues: "UPDATED_NEW"
    };

    try {
        const dados = await dynamoDb.update(params).promise();
        return dados;
    } catch (err) {
        console.log('err', err);
    }
}

module.exports = {
    salvar,
    remover,
    alterar
}