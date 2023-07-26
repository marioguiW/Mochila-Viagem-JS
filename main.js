const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {

    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find( elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){

        itemAtual.id = existe.id

        atualizaElemento(itemAtual)
        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        // Cria o elemento de acordo com as inforações e apresenta eles na tela
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length-1].id + 1 : 0;

        criaElemento(itemAtual);

        // Manda as informações para o objeto(array)
        itens.push(itemAtual);
    }

    // Transforma o array em string pois o LocalStorage só aceita string
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item){

    console.log(item)

    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade  
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    novoItem.appendChild(botaoDelete(item.id));

}

function atualizaElemento(item){
    console.log(document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade);
    itens[item.id].quantidade = item.quantidade;
}

function botaoDelete(id){
    const botao = document.createElement("button");
    botao.innerText = "X";

    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })
    return botao;
}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    console.log(itens);

    localStorage.setItem("itens", JSON.stringify(itens));
}