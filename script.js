let servicoSelecionado = "";

const botoes = document.querySelectorAll(".servico button");

botoes.forEach(function(botao) {
    botao.addEventListener("click",function() {

        const servico = botao.parentElement.querySelector("h3").textContent;

        servicoSelecionado = servico;

        document.getElementById("nome-servico").textContent = servicoSelecionado;

    });
});

const botaoContinuar = document.getElementById("botao-continuar");

botaoContinuar.addEventListener("click", function() {

    if (servicoSelecionado === "") {
        alert("selecione um serviço primeiro!");
        return;

    }

    const nomeCliente = document.getElementById("cliente-nome").value;

    if (nomeCliente === null || nomeCliente.trim() === "") {
        alert("digite seu nome para continuar!");
        return;
    }

    const telefoneCliente = document.getElementById("cliente-telefone").value;

    if (telefoneCliente === null || telefoneCliente.trim() === "") {
        alert("digite seu telefone para continuar!");
        return;
    }

    const dataAgendamento = document.getElementById("data-agendamento").value;
    const partesData = dataAgendamento.split("-");
    const dataFormatada = partesData[2] + "/" + partesData[1] + "/" + partesData[0];

    if (dataAgendamento === null || dataAgendamento.trim() === "") {
        alert("digite a data para continuar!");
        return;
    }

    const mensagem = "NOVO AGENDAMENTO - FS GARAGE DETAIL"+
        "\nCliente: " + nomeCliente +
        "\nTelefone: " + telefoneCliente +
        "\nData: " + dataFormatada +
        "\nServiço: " + servicoSelecionado;

    const mensagemWhatsapp = encodeURIComponent(mensagem);
    const linkWhatsapp = "https://wa.me/5527996511198?text=" + mensagemWhatsapp;
    window.location.href = linkWhatsapp;

    alert("cadastro realizado com sucesso!");

});