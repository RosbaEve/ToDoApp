const list = document.getElementById("list");       //getting elements
const input = document.getElementById("input");
let todoList = [];                                  // Creating empty array for todolistobjects
let id = 0;                                         // setting id to zero by default

const complete = "fa-check-circle-o";
const uncomplete = "fa-circle-thin";
let taskDone = document.getElementsByClassName("fa-cicrle-thin") //element and classes for checking if the task is complete

function addToDo(toDo, id, done, trash){            //function for adding todo item to list withid & cirlce icon for complete and trash for deleting                    
    
    if (trash == true) {                            //If the element of trash is true, rest of the code will not be executed
        return;
    }
    if (done == true) {                             //If done property is true, display check circle
        taskDone = complete;
    }
    if (done == false){                             //If done property is false, display empty circle
        taskDone = uncomplete;
    }

    const text = `<li class = "item">
                    <i class = "fa ${taskDone} co" job= "complete" id = ${id}></i>
                    <p class = "text">${toDo}</p> 
                    <i class=" fa fa-trash de" job = "delete" id = ${id}></i>
                 </li>`;

    const position = "afterbegin";                  //Adding the new todo item to the top of the list

    list.insertAdjacentHTML(position, text);       
}

document.getElementById("submit-button").addEventListener("click", function(){ //When submit-button is clicked, function is performed
    const toDo = input.value;                       //Assigning value for the toDo to be the text from input field

    if (toDo !== '') {                              //Checking that the input is not empty
        addToDo(toDo, id, false, false);

        todoList.push({                             //Adding properties for the list object
            name: toDo,
            id: id,
            done: false,
            trash : false,
        });
        id++;                                       //Id number increases so that every list object have unique id assigned 
    }
    if (toDo == '') {                               //If input field is empty, the page will give alert to add a task to the field
        alert("Please add task");
    }
    input.value = '';                               //Clearing the input field
});

addToDo("coffee", 1, true, false)

list.addEventListener('click', function(event){     //Event listener for the list so that we can perform different functions based on what element inside of the list is clicked
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "delete") {                    //If the job attribute is delete, perform delete funtion
        deleteToDo(element);
    }
})

function deleteToDo(element){                       //Deleting the element from page and assigning trash value for true
    element.parentNode.parentNode.removeChild(element.parentNode);
    todoList[element.id].trash = true;
}
