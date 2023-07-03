import verificaCPF from "./validaCPF.js";
import maiorDeIdade from "./validaIdade.js";

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'customError',
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

const formulario = document.querySelector("[data-formulario");
const camposRequired = document.querySelectorAll('[required]');

camposRequired.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo))
    campo.addEventListener('invalid', event => event.preventDefault());
});

function verificaCampo(campo) {

    let mensagem = "";
    campo.setCustomValidity("");

    if(campo.name === "cpf" && campo.value.length >= 11) {
        verificaCPF(campo);

    }

    if(campo.name === 'aniversario' && campo.value != "") {
        maiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {

        if(campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            campo.style.border = "2px solid red"
        }
    })

    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorInput = campo.checkValidity();

    if(!validadorInput){
        mensagemErro.textContent = mensagem;
        
    } else {
        mensagemErro.textContent = '';
    }

}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dadosDoFormulario = {
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value
    }

    localStorage.setItem("cadastro", JSON.stringify(dadosDoFormulario));

    window.location.href = '../pages/abrir-conta-form-2.html';
})