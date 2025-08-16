// CONFIG
const startDate = new Date("2025-08-12T00:00:00"); // Dia 30 abre em 12/08/2025
const totalDays = 30;
const grid = document.getElementById('grid');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeBtn = document.getElementById('closeBtn');
const backBtn = document.getElementById('backBtn');

// Mensagens (30 -> 0) — texto exibido quando o dia abre
const messages = {
  30: { text: "12/08/2025 - Terça-feira: Cartinha de abertura: Falta exatamente 1 mês para o dia em que você completa 30 anos… e cada dia até lá será especial!" },
  29: { text: "13/08/2025 - Quarta-feira: “Hoje é dia de adoçar a vida… e você é meu doce preferido.”" },
  28: {
    text: "14/08/2025 - Quinta-feira: Uma foto nossa de um momento marcante (até agora).",
    img: "../foto-marcante.JPG"
  },
  27: { text: "15/08/2025 - Sexta-feira: Você escolhe o jantar de hoje — vale pedir delivery ou jantar caseiro especial." },
  26: { text: "16/08/2025 - Sábado: Playlist com 3 músicas que marcaram a história da gente — aperte play e dance comigo:
        text: "https://youtu.be/8-tJHiP9lHQ?si=u-v1jYMqXEoOy99t"
        text: "https://youtu.be/kPa7bsKwL-c?si=cX93is9qMHOyWayE"
        text: "https://youtu.be/m-Tuvz2Iv3Y?si=Mj0gA4tCQxEvhmyw"
  " },
  25: { text: "17/08/2025 - Domingo: Café da manhã especial preparado por mim (seu pedido será atendido!)." },
  24: { text: "18/08/2025 - Segunda-feira: Vale-massagem (caseira) — horário reservado para relaxar nos seus termos." },
  23: { text: "19/08/2025 - Terça-feira: Um bilhete engraçado sobre uma mania sua que eu amo (e já me faz rir)." },
  22: { text: "20/08/2025 - Quarta-feira: Um vídeo curtinho meu contando algo que eu amo em você — aperte o play do coração." },
  21: { text: "21/08/2025 - Quinta-feira: Uma guloseima que você ama — pegue e aproveite sem culpa!" },
  20: { text: "22/08/2025 - Sexta-feira: Caça ao tesouro dentro de casa: siga as pistas e encontre um presentinho escondido." },
  19: { text: "23/08/2025 - Sábado: Vale-filme: você escolhe o filme da noite — eu preparo pipoca quentinha." },
  18: { text: "24/08/2025 - Domingo: Um mimo prático que você precisa ou vai gostar." },
  17: { text: "25/08/2025 - Segunda-feira: Bilhete com um elogio profundo sobre seu caráter — você é inspiração." },
  16: { text: "26/08/2025 - Terça-feira: Uma foto antiga sua." },
  15: { text: "27/08/2025 - Quarta-feira: Snack salgado preferido." },
  14: { text: "28/08/2025 - Quinta-feira: 5 motivos escritos por mim do porquê eu admiro você — guarde sempre." },
  13: { text: "29/08/2025 - Sexta-feira: Vale 'dia de folga' de alguma tarefa que você costuma fazer — hoje eu assumo." },
  12: { text: "30/08/2025 - Sábado: Uma bebida que você ama — esperando por você." },
  11: { text: "31/08/2025 - Domingo: Mensagem engraçada: “Faltam 11 dias para você virar oficialmente um trintão!”" },
  10: { text: "01/09/2025 - Segunda-feira: Uma camiseta ou boné no seu estilo — pegada prática e com carinho." },
  9:  { text: "02/09/2025 - Terça-feira: Vale-jogo: hoje você escolhe qual jogo vamos jogar (videogame ou tabuleiro)." },
  8:  { text: "03/09/2025 - Quarta-feira: Sobremesa caseira que você ama — doce feito com carinho por mim." },
  7:  { text: "04/09/2025 - Quinta-feira: Foto atual dos dois com frase romântica no verso — um momento fresquinho." },
  6:  { text: "05/09/2025 - Sexta-feira: Post-it escondido na carteira: “Te amo, daqui até a lua” — encontre hoje!" },
  5:  { text: "06/09/2025 - Sábado: Uma lembrança engraçada nossa escrita à mão para você rir e guardar." },
  4:  { text: "07/09/2025 - Domingo: Vale-café juntos em um lugar que você gosta — vamos sair e aproveitar." },
  3:  { text: "08/09/2025 - Segunda-feira: Carta contando como eu imagino nós daqui 30 anos — planos, risos e sonhos." },
  2:  { text: "09/09/2025 - Terça-feira: Um lanche surpresa antes do jantar — porque você merece mimo extra." },
  1:  { text: "10/09/2025 - Quarta-feira: Envelope final: “Amanhã começa a sua nova década… e a festa está só começando!”" },
  0:  { text: "11/09/2025 - Quinta-feira: Mensagem final: “Feliz 30 anos! Que essa nova fase seja repleta de amor, conquistas e felicidade!”" }
};

// Função para formatar data local
function formatDate(date) {
  return date.toLocaleDateString('pt-BR');
}

// Cria grid de botões (30 -> 1)
for (let i = 0; i < totalDays; i++) {
  const dayNumber = totalDays - i;
  const btn = document.createElement('button');
  btn.className = 'day-btn';
  btn.setAttribute('data-day', dayNumber);
  btn.setAttribute('role', 'listitem');
  btn.setAttribute('aria-label', `Dia ${dayNumber}`);

  const img = document.createElement('img');
  img.src = `images/day${dayNumber}.png`;
  img.alt = `Dia ${dayNumber}`;
  img.loading = 'lazy';

  const unlockDate = new Date(startDate);
  unlockDate.setDate(unlockDate.getDate() + i);

  const today = new Date();
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const unlockOnly = new Date(unlockDate.getFullYear(), unlockDate.getMonth(), unlockDate.getDate());

  if (todayOnly < unlockOnly) {
    btn.classList.add('disabled');
    btn.disabled = true;
    btn.title = `Desbloqueia em ${formatDate(unlockOnly)}`;
  } else {
    btn.addEventListener('click', () => openDay(dayNumber));
  }

  btn.appendChild(img);
  grid.appendChild(btn);
}

// abrir modal do dia
function openDay(day) {
  modalTitle.textContent = `Dia ${day}`;
  modalText.innerHTML = "";

  const textEl = document.createElement("p");
  textEl.textContent = messages[day]?.text || "Mensagem não encontrada.";
  modalText.appendChild(textEl);

  // Se for o dia 28, adiciona imagem clicável
  if (day === 28 && messages[day]?.img) {
    const imgEl = document.createElement("img");
    imgEl.src = messages[day].img;
    // imgEl.alt =  `Clique aqui`;
    imgEl.style.maxWidth = "100%";
    imgEl.style.marginTop = "10px";
    imgEl.style.cursor = "pointer";
    imgEl.style.display = "block";
    imgEl.style.marginLeft = "auto";
    imgEl.style.marginRight = "auto";

    imgEl.addEventListener("click", () => {
      window.open(
        messages[day].img,
        "day28",
        "width=800,height=600,resizable=yes"
      );
    });

    modalText.appendChild(imgEl);
  }

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('show'), 10);
  modal.focus();
}

// fechar modal
function closeModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}
closeBtn.addEventListener('click', closeModal);
backBtn.addEventListener('click', closeModal);

// fechar com ESC
window.addEventListener('keydown', (e) => {
  if(e.key === "Escape" && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
