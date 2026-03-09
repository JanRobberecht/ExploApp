function fillSupervisors(supervisors) {

  let supervisorSelect = document.querySelector(".supervision-intro select")

  supervisors.forEach(s => {

    let supervisorOption = document.createElement("option");
    supervisorOption.value = s;
    supervisorOption.innerHTML = s;
    supervisorSelect.appendChild(supervisorOption);
  })
}

function fillSupervisingSchedule(supervisingSchedule) {

  supervisingSchedule.forEach(s => {


    let names = s[1].split(';').filter(item => item !== '');

    if (names.length > 0) {

      let td = document.getElementById(s[0])

      if (!td) {return}
      else {
        names.forEach(n => {
          let div = document.createElement("div");
          div.innerHTML = n;
          td.appendChild(div);
        })
      }
    }
  })

  showDays(false)
}




/* SCREEN */




function showDays(allChecked) {
  const day = new Date().getDay();
  const table = document.getElementById("supervision-table");
  const rows = table.rows;

  

  if (allChecked) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j < rows[i].cells.length; j++) {
        let cell = rows[i].cells[j]
        cell.style.display = "";
      }
    }
  }

  if (!allChecked) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j < rows[i].cells.length; j++) {
        let cell = rows[i].cells[j]
        j == day ? cell.style.display = "" : cell.style.display = "none";
      }
    }
  }
}


let supervisionDay = document.getElementById("supervision-day")
supervisionDay.addEventListener('click', () => { showDays(supervisionDay.checked) });

let supervisionTeacher = document.getElementById("supervision-teacher")
supervisionTeacher.addEventListener('change', () => {

  let selected = supervisionTeacher.value;
  let tdDiv = document.querySelectorAll("table td div")
  tdDiv.forEach(t => {
    t.classList.remove("selected-name")

    if (t.textContent == selected)
      t.classList.add("selected-name")
  })
});