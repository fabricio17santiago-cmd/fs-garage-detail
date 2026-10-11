'use strict';
const WHATSAPP = '5527996511198'; // Número comercial usado no site anterior.
const menuButton = document.getElementById('menu-toggle');
const menuLinks = document.getElementById('nav-links');
menuButton.addEventListener('click', () => {
  const aberto = menuLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(aberto));
  menuButton.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
menuLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
const form = document.getElementById('booking-form');
const servico = document.getElementById('servico');
const data = document.getElementById('data');
const erro = document.getElementById('form-error');
const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, '0');
const dia = String(hoje.getDate()).padStart(2, '0');
data.min = `${ano}-${mes}-${dia}`;
document.getElementById('ano').textContent = String(ano);
document.querySelectorAll('.service-select').forEach(botao => {
  botao.addEventListener('click', () => {
    servico.value = botao.closest('.service-card').dataset.service;
    erro.textContent = '';
    document.getElementById('agendamento').scrollIntoView({behavior: 'smooth'});
    setTimeout(() => servico.focus({preventScroll: true}), 450);
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  erro.textContent = '';
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const dataValor = data.value;
  if (!servico.value) { erro.textContent = 'Selecione um serviço.'; servico.focus(); return; }
  if (!nome) { erro.textContent = 'Digite seu nome.'; document.getElementById('nome').focus(); return; }
  if (telefone.replace(/\D/g, '').length < 10) { erro.textContent = 'Digite um telefone válido com DDD.'; document.getElementById('telefone').focus(); return; }
  if (!dataValor || dataValor < data.min) { erro.textContent = 'Escolha uma data válida a partir de hoje.'; data.focus(); return; }
  const [aaaa, mm, dd] = dataValor.split('-');
  const mensagem = `*SOLICITAÇÃO DE AGENDAMENTO — FS GARAGE DETAIL*\n\n*Cliente:* ${nome}\n*Telefone:* ${telefone}\n*Serviço:* ${servico.value}\n*Data preferida:* ${dd}/${mm}/${aaaa}\n\nOlá! Gostaria de consultar a disponibilidade para essa data.`;
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.location.href = url;
});
