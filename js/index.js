const apiUrl = "https://script.google.com/macros/s/AKfycbwVJ-mz_inyuRUxCc7sGyK_oUsOk2cKtyr2xMQwZx65dI0BCaoW0jQ5EAOhGeWhuSqtQw/exec";

async function getData() {
  const loader = document.querySelector(".loader-container");

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    console.log(result)

    // Controleer of de API call succesvol was
    if (!result.success) {
      throw new Error(result.error);
    }

 
    const { supervisingSchedule, supervisors} = result;

 
   

    // Vul de frontend elementen
    fillSupervisors(supervisors);
    fillSupervisingSchedule(supervisingSchedule);

   

    loader.style.display = "none";

  } catch (error) {
    loader.style.display = "none";
    giveErrorMessage(error.message);
  }
}



function giveErrorMessage(error) {

  let body = document.querySelector("body")
  body.innerHTML = ""
  let div = document.createElement("div");
  div.innerHTML = "Volgende fout is opgetreden met als code:</br></br><b>" + error + "</b></br></br>" + new Date();
  body.appendChild(div)

}


const scrollTable = document.querySelector(".table-container");

function updateFade() {

  const maxScroll =
    scrollTable.scrollWidth - scrollTable.clientWidth;

  if (scrollTable.scrollLeft >= maxScroll - 1) {
    scrollTable.classList.remove("fade-right");
    scrollTable.classList.add("no-fade");
  } else {
    scrollTable.classList.add("fade-right");
    scrollTable.classList.remove("no-fade");
  }

}

scrollTable.addEventListener("scroll", updateFade);
window.addEventListener("load", updateFade);
window.addEventListener("resize", updateFade);


/* SCREEN */


let btnUp = document.getElementById('btn-arrow-up');
let btnDown = document.getElementById('btn-arrow-down');
let scrollInterval;
let isTouchScrolling = false;

// scrolls one step smoothly (for click)
function scrollOnce(direction) {
  window.scrollBy({
    top: direction === 'up' ? -150 : 150,
    left: 0,
    behavior: 'smooth'
  });
}

// starts continuous scroll when held
function startScrolling(direction) {
  stopScrolling(); // prevent duplicate intervals
  isTouchScrolling = true;

  scrollInterval = setInterval(() => {
    window.scrollBy({
      top: direction === 'up' ? -30 : 30,
      left: 0,
      behavior: 'auto' // instant, to stay responsive
    });
  }, 20); // small interval = faster scrolling
}

// stops the continuous scroll
function stopScrolling() {
  clearInterval(scrollInterval);
  isTouchScrolling = false;
}

// single smooth scroll on click/tap
btnUp.addEventListener('click', () => scrollOnce('up'));
btnDown.addEventListener('click', () => scrollOnce('down'));

// continuous scroll when holding mouse
btnUp.addEventListener('mousedown', () => startScrolling('up'));
btnDown.addEventListener('mousedown', () => startScrolling('down'));

// continuous scroll when holding touch
btnUp.addEventListener('touchstart', e => {
  e.preventDefault(); // prevent short tap glitch
  startScrolling('up');
});
btnDown.addEventListener('touchstart', e => {
  e.preventDefault();
  startScrolling('down');
});

// stop scroll when releasing or leaving
['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(event => {
  btnUp.addEventListener(event, stopScrolling);
  btnDown.addEventListener(event, stopScrolling);
});


document.addEventListener("DOMContentLoaded", () => { 
  getData() 
  document.getElementById("supervision-day").checked = false;
})

