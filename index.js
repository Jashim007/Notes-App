const notes_section = document.getElementsByClassName("notes_section");
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let new_note_data = `<div class="add_notes">
        <div class="add_notes_button">
          <i class="fa-solid fa-plus fa-3x"></i>
        </div>
        <div class="add_notes_desc">
          <p>Add New Note</p>
        </div>
      </div>`;

function showNotes() {
  new_note_data = `<div class="add_notes">
        <div class="add_notes_button">
          <i class="fa-solid fa-plus fa-3x"></i>
        </div>
        <div class="add_notes_desc">
          <p>Add New Note</p>
        </div>
      </div>`;
  for (let i of notes) {
    new_note_data += `<div class="notes">
         <div class="notes_id">${i.id}</div>
        <div class="notes_title">${i.title}</div>
        <div class="notes_body">
        ${i.desc}
        </div>
        <div class="empty"></div>
        <div class="notes_footer">
          <div class="notes_date">${i.currDate}</div>
          <div class="notes_edit"> <i class="fa-solid fa-pen-to-square edit_notes" id="edit_notes_${i.id}"></i>
            <i class="fa-solid fa-trash delete_notes" id="delete_notes_${i.id}"></i></div>
        </div>
      </div>`;
  }
  notes_section[0].innerHTML = new_note_data;
}
function findMaxId(obj) {
  return obj.reduce((acc, e) => {
    if (e.id > acc) acc = e.id;
    return acc;
  }, 0);
}

showNotes();
const popup_section = document.getElementsByClassName("popup_section");
const update_popup_section = document.getElementsByClassName(
  "update_popup_section"
);
const overlay = document.getElementsByClassName("overlay");
const add_notes = document.getElementsByClassName("add_notes");
const popup_display_flex =
  document.getElementsByClassName("popup_display_flex");
const form_title = document.getElementById("title");
const popup_header_icon = document.getElementsByClassName("popup_header_icon");
const form_add_btn = document.getElementsByClassName("form_add_btn");
const form_desc = document.getElementById("desc");
const delete_notes = document.getElementsByClassName("delete_notes");
const edit_notes = document.getElementsByClassName("edit_notes");

function toggleAddNotes() {
  overlay[0].classList.toggle("popup_display_flex");
  popup_section[0].classList.toggle("popup_display_flex");
}
function addAddNotes() {
  overlay[0].classList.add("popup_display_flex");
  popup_section[0].classList.add("popup_display_flex");
}
function removeAddNotes() {
  overlay[0].classList.remove("popup_display_flex");
  popup_section[0].classList.remove("popup_display_flex");
}
function addUpdateNotes() {
  overlay[0].classList.add("popup_display_flex");
  update_popup_section[0].classList.add("popup_display_flex");
}
function removeUpdateNotes() {
  overlay[0].classList.remove("popup_display_flex");
  update_popup_section[0].classList.remove("popup_display_flex");
}
function getCurrDate() {
  const d = new Date();

  let year = d.getFullYear();
  let month = months[d.getMonth()];
  let day = d.getDate();
  return `${month} ${day},${year}`;
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* --------------------------------------------------------- */

add_notes[0].addEventListener("click", toggleAddNotes);
overlay[0].addEventListener("click", removeAddNotes);
overlay[0].addEventListener("click", removeUpdateNotes);
popup_header_icon[0].addEventListener("click", removeAddNotes);
popup_header_icon[1].addEventListener("click", removeUpdateNotes);
form_add_btn[0].addEventListener("click", (e) => {
  let id = +findMaxId(notes) + 1;
  let cdate = getCurrDate();
  let notes_data = {
    id,
    title: form_title.value,
    desc: form_desc.value,
    currDate: cdate,
  };
  notes.push(notes_data);
  localStorage.setItem("notes", JSON.stringify(notes));
});

for (let j of delete_notes) {
  j.addEventListener("click", (e) => {
    let target_id = e.target.id;
    let delete_target_id = target_id.split("_")[2];
    notes = notes.filter((n) => n.id != delete_target_id);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    location.reload();
  });
}

for (let k of edit_notes) {
  k.addEventListener("click", (e) => {
    let target_id = e.target.id;
    let edit_target_id = target_id.split("_")[2];
    addUpdateNotes();
    let edit_notes_data = notes.filter((n) => n.id == edit_target_id);
    console.log(edit_target_id);

    document.getElementById("update_title").value = edit_notes_data[0].title;
    document.getElementById("update_desc").value = edit_notes_data[0].desc;
    document
      .getElementById("update_note_data")
      .addEventListener("click", () => {
        let cdate = getCurrDate();
        for (let u of notes) {
          if (u.id == edit_target_id) {
            u.title = document.getElementById("update_title").value;
            u.desc = document.getElementById("update_desc").value;
            u.currDate = cdate;
          }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
      });
  });
}
