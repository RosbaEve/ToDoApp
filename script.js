const list = document.getElementById("list");       //getting elements
const input = document.getElementById("input");
let todoList = [];                                  // Creating empty array for todolistobjects

function addToDo(toDo){                             //function for adding todo item to list with cirlce icon for complete and trash for deleting                    

    const text = `<li class = "item">
                    <i class = "fa fa-circle-thin co" job="complete"></i>
                    <p class = "text">${toDo}</p> 
                    <i class=" fa fa-trash de" job = "delete"></i>
                 </li>`;

    const position = "afterbegin";                  //Adding the new todo item to the top of the list

    list.insertAdjacentHTML(position, text);       
}

document.getElementById("submit-button").addEventListener("click", function(){ //When submit-button is clicked, function is performed
    const toDo = input.value;                       //Assigning value for the toDo to be the text from input field

    if (toDo !== '') {                              //Checking that the input is not empty
        addToDo(toDo)
    }
    if (toDo == '') {                               //If input field is empty, the page will give alert to add a task to the field
        alert("Please add task");
    }
    input.value = '';                               //Clearing the input field
});