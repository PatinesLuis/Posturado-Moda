class Produto{

    constructor(){
        this.id = 1
        this.arrayProdutos = [];
        this.editID = null;
    }

    salvar(){
        let produto = this.lerDados();
        
        if(this.validarCampos(produto)){
            if(this.editID == null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.editID, produto)
            }
           
        }

        console.log(this.arrayProdutos)
        this.listarTavela()
    }

    listarTavela(){
        let tbody = document.getElementById('tbody')
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_Produto = tr.insertCell();
            let td_Valor = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_Produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_Valor.innerText = this.arrayProdutos[i].preco;

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute("onclick", "produto.prepararEdicao("+ JSON.stringify(this.arrayProdutos[i])+")")            

            let imgDelete = document.createElement('img')            
            imgDelete.src = 'img/delete.png'
            imgDelete.setAttribute("onclick", "produto.deletar("+ this.arrayProdutos[i].id+")")

            td_acao.appendChild(imgEdit);
            td_acao.appendChild(imgDelete)
        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;

        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''
    }

    atualizar(id, produto){
        for(let i = 0; i< this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    prepararEdicao(dados){
        this.editID = dados.id

        document.getElementById('produto').value = dados.nomeProduto
        document.getElementById('preco').value = dados.preco

        document.getElementById('btn1').innerHTML = 'atualizar'
        document.getElementById('btn2').innerHTML = 'Voltar'

    }

    lerDados(){
        let produto = {

        }
        produto.id = this.id
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value

        return produto
    }

    validarCampos(produto){
        let msg = '';

        if(produto.nomeProduto == ''){
            msg += 'Infome o nome do produto \n'
        }

        if(produto.preco == ''){
            msg += 'Infome o preço do produto \n'
        }

        if(msg != ''){
            alert(msg)
            return false
        }

        return true;
    }

    cancelar(){
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''

        document.getElementById('btn1').innerText = "Salvar"
        this.editID = null
    }

    deletar(id){

        if(confirm("Deseja deletar o produto do ID: "+id + " ?")){
            let tbody = document.getElementById('tbody')
        
        for(let i = 0; i < this.arrayProdutos.length; i++)
        if(this.arrayProdutos[i].id == id){
            this.arrayProdutos.splice(i, 1)
            tbody.deleteRow(i);
            alert('item deletado com sucesso') 
        }
        }
        
    }


}

var produto = new Produto();