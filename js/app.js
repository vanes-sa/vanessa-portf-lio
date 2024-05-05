const filter_btns = document.querySelectorAll(".filter-btn");
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");

footer_input.addEventListener("focus", () => {
  footer_input.classList.add("focus");
});

footer_input.addEventListener("blur", () => {
  if (footer_input.value != "") return;
  footer_input.classList.remove("focus");
});

function closeMenu() {
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
}

hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
  } else {
    closeMenu();
  }
});

links.forEach((link) => link.addEventListener("click", () => closeMenu()));

filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({ filter: filterValue });
  })
);

$(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
  transitionDuration: "0.6s",
});

window.addEventListener("scroll", () => {
  skillsEffect();
  countUp();
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
  if (!checkScroll(records_wrap)) return;
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 100;
      const increment = Math.ceil(maxNum / speed);

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1);
      } else {
        numb.innerText = maxNum;
      }
    };

    setTimeout(updateCount, 400);
  });
}

var mySwiper = new Swiper(".swiper-container", {
  speed: 1100,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});



// 
function enviarFormulario(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://formspree.io/f/mnqyrejg');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Sucesso ao enviar o formulário
        console.log('Formulário enviado com sucesso');
        exibirMensagemSucesso();
        limparCamposFormulario();
      } else {
        // Erro ao enviar o formulário
        console.error('Erro ao enviar o formulário');
        exibirMensagemErro();
      }
    }
  };

  xhr.send(formData);
}

function exibirMensagemSucesso() {
  const mensagemSucesso = document.getElementById('mensagem-sucesso');
  mensagemSucesso.style.display = 'block';
}

function exibirMensagemErro() {
  const mensagemErro = document.getElementById('mensagem-erro');
  mensagemErro.style.display = 'block';
}

function limparCamposFormulario() {
  const form = document.getElementById('contact-form');
  form.reset();
}

// evitar clique mouse direita
document.oncontextmenu = () => {
  return true
}

document.onkeydown = e => {
  if(e.key == "F12"){
    return false
  }

  if(e.ctrlKey && e.key == "u"){
    return false
  }

  
  if(e.ctrlKey && e.shiftKey){
    return false
  }

}

