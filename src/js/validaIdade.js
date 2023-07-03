export default function maiorDeIdade(dados) {
    const data = new Date(dados.value);

    if(!ValidaIdade(data)) {
        dados.setCustomValidity('O usuário não é o maior de idade');
    }

}

function ValidaIdade(data) {
    const dataAtual = new Date();
    const maiorDeIdade = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= maiorDeIdade;

}