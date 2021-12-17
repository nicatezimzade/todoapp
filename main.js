let form = document.querySelector(".todo_form");
let input = document.querySelector(".todo_input");
let todo_container = document.querySelector(".todo_container");
let todo_deadline = document.querySelector(".todo_deadline")

let startConf = () => {
   let todos = JSON.parse(localStorage.getItem("todos"));
   if (!todos) {
      localStorage.setItem("todos", JSON.stringify([]));
   } else {
      todos.forEach(todo => {
         addHTML(todo);
      });
   } 
}

let addTodo = (e) => {
   e.preventDefault();

   let todoDeadline = todo_deadline.value;
   let inputVal = input.value;

   if (todoDeadline == ""|| inputVal == "") {
     alert("You cant add an empty task.");
     return;
   }

   let todo = {
      text: inputVal,
      isCompleted: false,
      deadline : todoDeadline
   };

   let todos = JSON.parse(localStorage.getItem("todos"));
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));

   addHTML(todo);

   form.reset();
}

let deleteTodo = (e) => {
   let todo = e.target.parentElement.parentElement;
   let text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   todos = todos.filter(td => td.text != text);
   localStorage.setItem("todos", JSON.stringify(todos));

   todo.remove();
}

let completeTodo = (e) => {
   let todo = e.target.parentElement.parentElement;
   let text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === text) td.isCompleted = !td.isCompleted 
   });

   localStorage.setItem("todos", JSON.stringify(todos));
}

let saveTodo = (e) => {
   let todo = e.target.parentElement.parentElement;
   let prevText = todo.firstChild.children[1].textContent; 
   let newText = todo.firstChild.children[2].value; 

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === prevText) td.text = newText;
   });

   localStorage.setItem("todos", JSON.stringify(todos));

   todo.firstChild.children[1].textContent = newText;  

   todo.classList.remove("-edited"); 
}

let editTodo = (e) => {
   let todo = e.target.parentElement.parentElement;
   todo.classList.add("-edited");
}

let addHTML = (todo) => {
   let todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   let todoLeft = document.createElement("div");
   todoLeft.classList.add("todo_left");
   
   let editInput = document.createElement("input");
   editInput.classList.add("todo_editInput")
   editInput.defaultValue = todo.text;

   let todoCb = document.createElement("input");
   todoCb.type = "checkbox";
   todoCb.checked = todo.isCompleted; 
   todoCb.classList.add("todo_cb");
   todoCb.addEventListener("click", completeTodo);

   let todoText = document.createElement("span");
   todoText.classList.add("todo_text");
   todoText.textContent = todo.text;

   todoLeft.appendChild(todoCb);
   todoLeft.appendChild(todoText);
   todoLeft.appendChild(editInput);

   let todoRight = document.createElement("div");
   todoRight.classList.add("todo_right");


   let todoDeadline = todo.deadline;
   console.log(todoDeadline)
   let d1 = new Date(todoDeadline);
   let d2 = new Date();
 
   let newSpan = document.createElement("span");
   newSpan.classList.add("badge", "rounded-pill", "bg-danger", "me-3");
   console.log(d1)
   console.log(d2)

   newSpan.innerText = msToMin(d1 - d2) + " minutes left.";

   let deleteBtn = document.createElement("button");
   deleteBtn.classList.add("todo_delete");
   deleteBtn.textContent = "Delete";
   deleteBtn.addEventListener("click", deleteTodo);
   
   let editBtn = document.createElement("button");
   editBtn.classList.add("todo_edit");
   editBtn.textContent = "Edit";
   editBtn.addEventListener("click", editTodo);
   
   let saveBtn = document.createElement("button");
   saveBtn.classList.add("todo_save");
   saveBtn.textContent = "Save";
   saveBtn.addEventListener("click", saveTodo);

   todoRight.appendChild(newSpan)
   todoRight.appendChild(deleteBtn);
   todoRight.appendChild(editBtn);
   todoRight.appendChild(saveBtn);
   

   todoDiv.appendChild(todoLeft);
   todoDiv.appendChild(todoRight);

   todo_container.appendChild(todoDiv);
}

function msToMin(time) {
    return Math.round(time / 60000);
  }

startConf();

form.addEventListener("submit", addTodo);