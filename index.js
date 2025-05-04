import http from 'http';
import url, {URLSearchParams} from 'url';
import { Script } from 'vm';

const host = 'localhost';
const porta = 3000;

function responderRequisicao(requisicao, resposta)
{
    if(requisicao.method === "GET")
    {
        const dados = new URLSearchParams(url.parse(requisicao.url).query);
        const nome = dados.get('Nome');
        const sobrenome = dados.get('Sobrenome');
        const idade = dados.get('Idade');
        const sexo = dados.get('Sexo');
        const sal = dados.get('Sal');
        const ano = dados.get('AnoCont');
        const mat = dados.get('Mat');
        
        resposta.setHeader('Content-type','text/html');
        resposta.write('<html>');
        resposta.write('<head>');
        resposta.write('<meta charset="UTF-8">');
        resposta.write('<title>Resposta </title>');
        resposta.write('<style> body{background-color:darkgrey; justify-content: center; align-items: center; font-family:sans-serif;} h1{text-align:center;} div{justify-self:center; background-color:white; padding: 30px;border-radius: 12px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);max-width: 80%;width: 100%;} .errado{color: red} </style>');
        resposta.write('</head>');
        resposta.write('<body>');
        resposta.write('<h1 style="margin-top: 50px;"> Reajuste de Salário</h1>');
        resposta.write('<div><p>Olá Seja bem vindo!</p>');
        resposta.write('<p>Por favor entre com as informações <strong>Nome, Sobrenome, Idade, Sexo(M/F), Salário base, Ano de contratação e Matrícula</strong> no endereço da página.<br> Exemplo: http://localhost:3000/?Nome=Nivaldo&Sobrenome=Targino&Idade=21&Sexo=M&Sal=2500&AnoCont=2020&Mat=3000 </p><p class="errado">');

        var correto=1;
        if(!nome || !sobrenome)
        {
            correto=0;
            resposta.write('<br> Insira o Nome e o Sobrenome!');
        }
        
        var numidade = Number(idade);
        if(numidade<=16)
        {
            correto=0;
            resposta.write('<br> Idade deve ser maior que 16!');
        }
        
        if(sexo!='F' && sexo!='M')
        {
            correto=0;
            resposta.write('<br> Sexo deve ser M ou F!');
        }

        var numsal = Number(sal);
        if(numsal<=0)
        {
            correto=0;
            resposta.write('<br> Salário deve ser positivo!');
        }

        var numano = Number(ano);
        if(numano<=1960)
        {
            correto=0;
            resposta.write('<br> Ano de contratação deve ser maior que 1960!');
        }


        var nummat = Number(mat);
        if(nummat<0)
        {
            resposta.write('<br>Matrícula deve ser um numero positivo!');  
            correto=0;  
        }
        if(!Number.isInteger(nummat))
        {
            resposta.write('<br>Matrícula deve ser um numero inteiro!');
            correto=0;
        }

        var reaj;
        var tempo=2025-numano;
        var novosal;
        if(numidade>=18 || numidade<=39)
        {
            if(sexo=='M')
            {
                reaj=numsal/100*10;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-10;
                }
                else
                    novosal=numsal+reaj+17;
            }
            if(sexo=='F')
            {
                reaj=numsal/100*8;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-11;
                }
                else
                    novosal=numsal+reaj+16;
            }
        }
        if(numidade>=40 || numidade<=69)
        {
            if(sexo=='M')
            {
                reaj=numsal/100*8;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-5;
                }
                else
                    novosal=numsal+reaj+15;
            }
            if(sexo=='F')
            {
                reaj=numsal/100*10;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-7;
                }
                else
                    novosal=numsal+reaj+14;
            }
        }
        if(numidade>=70 || numidade<=99)
        {
            if(sexo=='M')
            {
                reaj=numsal/100*15;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-15;
                }
                else
                    novosal=numsal+reaj+14;
            }
            if(sexo=='F')
            {
                reaj=numsal/100*17;
                if(tempo<=10)
                {
                    novosal=numsal+reaj-17;
                }
                else
                    novosal=numsal+reaj+12;
            }
        }
        if(correto)
        {
            resposta.write('</p><br>Nome: '+nome+' '+sobrenome);
            resposta.write('<br>Idade: '+numidade);
            resposta.write('<br>Sexo: '+sexo);
            resposta.write('<br>Salário base: '+numsal+'R$');
            resposta.write('<br>Ano de Contratação: '+numano);
            resposta.write('<br>Matricula: '+nummat);
            resposta.write('<br><strong>Seu novo Salário é: '+novosal+'R$</strong>');
        }
        resposta.write('</div></body>');
        resposta.write('</html>');
        resposta.end();
    }
}

const servidor = http.createServer(responderRequisicao);

servidor.listen(porta, host, () =>{
    console.log('Servidor escutando em http://'+ host + ":" + porta);
})