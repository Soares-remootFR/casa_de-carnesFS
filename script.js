// script.js

// MENU ATIVO
document.addEventListener( 'DOMContentLoaded', () => {
  // Destaca o link atual no menu (já feito via classe 'active' no HTML, aqui só para SPA)
} );

// FORMULÁRIO DE PEDIDO: cálculo de total e simulação de parcelamento
function atualizarTotal() {
  // Seleciona todos os inputs de quantidade dos produtos
  const produtos = document.querySelectorAll( '.produto-pedido' );
  let total = 0;
  produtos.forEach( input => {
    const preco = parseFloat( input.dataset.preco );
    const qtd = parseFloat( input.value ) || 0;
    total += preco * qtd;
  } );

  // Atualiza total no HTML
  document.getElementById( 'total-pedido' ).textContent = 'R$ ' + total.toFixed( 2 );

  // Atualiza simulação de parcelamento (até 6x)
  const parcelas = document.getElementById( 'parcelas' ).value;
  if ( parcelas >= 1 && total > 0 ) {
    const valorParcela = total / parcelas;
    document.getElementById( 'valor-parcela' ).textContent = 'R$ ' + valorParcela.toFixed( 2 );
  } else {
    document.getElementById( 'valor-parcela' ).textContent = '-';
  }

  // Habilita ou desabilita botão de envio
  document.getElementById( 'btn-enviar-pedido' ).disabled = ( total === 0 );
}

// Listeners para inputs de quantidade e parcelas
document.addEventListener( 'DOMContentLoaded', () => {
  document.querySelectorAll( '.produto-pedido' ).forEach( input => {
    input.addEventListener( 'input', atualizarTotal );
  } );
  const selectParcelas = document.getElementById( 'parcelas' );
  if ( selectParcelas )
    selectParcelas.addEventListener( 'change', atualizarTotal );
} );

// Envio do formulário de pedidos (exemplo de prevenção)
document.addEventListener( 'DOMContentLoaded', () => {
  const form = document.getElementById( 'form-pedido' );
  if ( form ) {
    form.addEventListener( 'submit', function ( e ) {
      e.preventDefault();
      alert( 'Pedido enviado! Em breve entraremos em contato para confirmar.' );
      form.reset();
      atualizarTotal();
    } );
  }
} );