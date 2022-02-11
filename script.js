


let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function(e) {

  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");
  
    if (addTitle.value == "" || addTxt.value == "") {
        return alert("Adicione o título da nota e seu conteúdo.")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  showNotes();
});


function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
        <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Deletar Nota</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Editar Nota</button>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Ainda não há notas! Adicione uma nota usando o formulário acima.`;
  }
}

function deleteNote(index) {

    let confirmDel = confirm("Deseja deletar esta nota?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
  
}


function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    if (addTitle.value !== "" || addTxt.value !== "") {
      return alert("Por favor , limpe o formulário antes de editar a nota")
    } 

    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addTxt.value = element.text;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}


showNotes();