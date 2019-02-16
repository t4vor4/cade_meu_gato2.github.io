console.log(estes_locais)




let tempo = 0;

let pontuacao = 0;

let controle = 0;

let sala_errada;


$(document).ready(function(){
    //Inicio
    inicio_do_jogo();
    // splash()

    $(document).on('click', '.start', function(event) {
        inicio_do_jogo();
    })

    // perguntar para alguem
    $(document).on('click', '.inicio', function(event) {
        //amigos_nesta_sala(lista_de_amigos, estes_locais[controle])
        esta_sala_aqui(estes_locais[controle])
    })

    $(document).on('click', '.voltar', function(event) {
        //amigos_nesta_sala(lista_de_amigos, estes_locais[controle])
        esta_sala_aqui(estes_locais[controle])
    })

    // Quando vc escolhe um amigo para perguntar    
    $(document).on('click', '.perg_pers', function(event) {
        // pessoa_responde(amigo_responde)
        let id_amigo = $(this).attr('data-amigo');
        let posicao = $(this).attr('data-pos');
        pessoa_responde(id_amigo,posicao,estes_locais[controle+1])
        
    })

    //Se for perguntar para mais amigos
    $(document).on('click', '.perguntar_alguem', function(event) {
        lista_de_amigos = shuffle_arr(lista_de_amigos_fix)
        if (pontuacao == controle) {
            amigos_nesta_sala(lista_de_amigos,estes_locais[controle])
        }
        else {
            amigos_nesta_sala(lista_de_amigos,sala_errada)
        }
    })

    //se for procurar em algum lugar
    $(document).on('click', '.locais_casa', function(event) {
        locais_da_casa(define_proximos_locais())
    })

    $(document).on('click', '.local', function(event) {
        console.log(estes_locais)
        let dois_errados_um_certo = []
        let index_correto 
        let proximo_local = $(this).attr('data-local');

        if (proximo_local != null) {
            if (proximo_local == estes_locais[(pontuacao+1)].data) {
                pontuacao++
                jujuba = (pontuacao+1)
                controle = pontuacao
                pista_do_gato(estes_locais[controle]);
                
            }
            else if (proximo_local == estes_locais[pontuacao].data) {
                controle = pontuacao
                esta_sala_aqui(estes_locais[pontuacao])
            }
            else {
                controle++
                for (let index = 0; index < estes_locais.length; index++) {
                    if (proximo_local ==  estes_locais[index].data) {
                        index_correto = [index]
                    }
                }
                sala_errada = estes_locais[index_correto]
                esta_sala_aqui(sala_errada)
            }
        }
        
    })  

})

function splash() {
    $('.content').html(
        '<section class="splash splash--1">'+
        '<h1><img src="./src/GGJ00_Logo_Dark.png" /></h1>'+
        '</section>'
    )
    setTimeout(function(){
        $('.splash--1').fadeOut(200, function(){
            $('.content').html(
                '<section class="splash splash--2" style="display:none;">'+
                '<h1><img class="gato_logo" src="./src/gato_logo.png" /><strong>Cara, <small>cade meu gato?</small></strong></h1>'+
                '<div class="containers containers--inicio" style="display:none;">'+
                // '</div>'+
                '<button class="nes-btn start">Início</button>'+
                '</div>'+
                '</section>'
            )
            setTimeout(function(){

            },500)
            $('.splash--2').fadeIn(200, function(){
                $('.containers--inicio').fadeIn(300)
            })
        });
    },3000)
}
function esta_sala_aqui(local_atual) {
    console.log('pontuacao = '+pontuacao)
    console.log('controle = '+controle)
    console.log('estes_locais[pontuacao].attr')
    

    $('.content').html(
        '<section class="nes-container with-title">'+
        '<h2 class="title">Você esta em '+local_atual.nome+'</h2>'+
        '<p>'+local_atual.descricao+'</p>'+
        '<div class="containers">'+
        // '</div>'+
        '<button class="nes-btn locais_casa">Procurar em algum cômodo</button>'+
        '<button class="nes-btn perguntar_alguem" >Perguntar para alguém</button>'+
        '</div>'+
        '</section>'
    )
}

function amigos_nesta_sala(lista_amigo, local_atual) {   
    //alert('teste') 
    $('.content').html(
        '<section class="nes-container with-title">'+
        '<h2 class="title">Você esta em '+local_atual.nome+'</h2>'+
        '<p>'+local_atual.descricao+'</p>'+
        '<div class="containers">'+
        '<button class="nes-btn perg_pers perg_pers_1" data-pos="0" data-amigo="'+lista_amigo[0].id+'">Perguntar para <strong>'+lista_amigo[0].nome+'</strong></button>'+
        '<button class="nes-btn perg_pers perg_pers_2" data-pos="1" data-amigo="'+lista_amigo[1].id+'">Perguntar para <strong>'+lista_amigo[1].nome+'</strong></button>'+
        '<button class="nes-btn perg_pers perg_pers_3" data-pos="2" data-amigo="'+lista_amigo[2].id+'">Perguntar para <strong>'+lista_amigo[2].nome+'</strong></button>'+
        '<button class="nes-btn is-warning voltar">Voltar</button>'+
        '</div>'+
        '</section>'
    )
}

function pessoa_responde(id_pessoa,posicao,arr_frases) {
    let frases = arr_frases.pistas;
    if (frases == null) {
        frases = ['eita', 'nossa', 'sei não, bixo!']
    }
    //console.log(frases)
    let pessoa = {};
    if (pontuacao < controle){
        frases = ['foi mal ai...','não vi não.','gato? Qual gato?']
    }
    for (let index = 0; index < lista_de_amigos.length; index++) {
        if (lista_de_amigos[index].id == id_pessoa) {
            pessoa = {
                nome: lista_de_amigos[index].nome,
                texto: lista_de_amigos[index].frase + frases[posicao],
            }
        }
    }

    // console.log(frases)

    $('.content').html(
        '<section class="nes-container with-title">'+
        '<h2 class="title">'+pessoa.nome+'</h2>'+
        '<div class="containers">'+
        '<p class="nes-balloon from-left">'+pessoa.texto+'</p>'+
        '<div class="containers">'+
        '</div>'+
        '<button class="nes-btn locais_casa">procurar em algum cômodo</button>'+
        '<button class="nes-btn perguntar_alguem">Perguntar para mais Alguém</button>'+
        '</div>'+
        '</section>'
    )
}

function locais_da_casa(locais_ativos) {
    $('.content').html(
        '<section class="nes-container is-dark with-title">'+
        '<h2 class="title">Onde esse gato deve estar?</h2>'+
        '<div class="containers">'+
        '<p>Locais da casa</p>'+
        '<div class="containers">'+
        '<button class="nes-btn is-dark local" data-local="'+locais_ativos[0].data+'">'+locais_ativos[0].nome+'</button>'+
        '<button class="nes-btn local" data-local="'+locais_ativos[1].data+'">'+locais_ativos[1].nome+'</button>'+
        '<button class="nes-btn local" data-local="'+locais_ativos[2].data+'">'+locais_ativos[2].nome+'</button>'+
        '<button class="nes-btn is-warning voltar">Voltar</button>'+
        '</div>'+
        '</section>'
    )
}

function inicio_do_jogo() {
    $('.content').html(
        '<section class="nes-container"><p>'+
        'Você acorda na sua casa depois de uma festa de arromba. Vários amigos ainda estão por ai mas tudo que você quer é ver o Mingau, seu gato de estimação mas aparentemente ele sumiu. você encontra algém cambaleante e faz a única pergunta de valor nesta manhã:'+
        '</p>'+
        '<div class="containers">'+
        '</div>'+
        '<button class="nes-btn inicio">CARA, CADÊ MEU GATO??</button>'+
        '</div>'+
        '</section>'

    )
}

function pista_do_gato($arr) {
    let teste = estes_locais[(controle+1)];
    if (teste != null) {
        console.log(teste.data)
        $('.content').html(
            '<section class="nes-container">'+
            '<div class="containers">'+
            '<h2 class="big">Opa! Parece que ele passou mesmo por aqui... tem pelo pra todo lado!</h2>'+
            '</div>'+
            '</section>'
        )
        setTimeout(function(){
            esta_sala_aqui($arr)
        },2500)
    }
    else {
        $('.content').html(
            '<section class="nes-container with-title">'+
            '<h2 class="title">Você o achou em: '+estes_locais[controle].nome+'</h2>'+
            '<p>'+desc.fim+'</p>'+
            '<div class="containers">'+
            // '</div>'+
            '<button class="nes-btn start">Jogar outra vez</button>'+
            '</div>'+
            '</section>'
        )
    }
    
    
}

function define_proximos_locais() {    

    let locais_errados = []

    let dois_errados_um_certo = []

    for (let i = 0; i < estes_locais.length; i++) {
        if (i !== pontuacao) {//local onde estava      
            if (i !== controle) {//local onde estou
                if (i !== (pontuacao+1)) {//local correto
                    locais_errados.push(estes_locais[i]);
                }
            }
        }
    }
    if (controle == pontuacao) {
        // indo ok
        dois_errados_um_certo.push(estes_locais[(pontuacao+1)])
    }
    else {
        // Errei aqui
        dois_errados_um_certo.push(estes_locais[pontuacao])
    }
    for (let index = 0; index < 2; index++) {
        dois_errados_um_certo.push(locais_errados[index])              
    }

    //console.log(dois_errados_um_certo)
    if (controle > pontuacao+2) {
        controle = pontuacao+2
    }
    
    return shuffle_arr(dois_errados_um_certo)
}


//Apoio 
function shuffle_arr(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}