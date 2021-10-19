const list = document.getElementById("list");       //getting elements
const input = document.getElementById("input");
let todoList = [];                                  // Creating empty array for todolistobjects

function addToDo(ToDO){                             //function for adding todo item to list with cirlce icon for complete and trash for deleting
    const ToDO = input.value;                       

    const text = `<li class="item>
                    <i class = " co fa fa-circle-thin" job="complete"></i>   
                    <p class = "text">${ToDo}<p> 
                    <i class="de fa fa-trash-o" job = "delete></i>`;

    const position = "afterbegin";                  //Adding the new todo item to the top of the list

    list.insertAdjacentHTML(position, text);        
}