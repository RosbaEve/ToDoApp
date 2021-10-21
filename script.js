//elements and variables

const list = document.getElementById("list");       //getting elements
const input = document.getElementById("input");
let todoList = [];                                  // Creating empty array for todolistobjects
let id = 0;                                         // setting id to zero by default

const complete = "fa-check-circle-o";
const uncomplete = "fa-circle-thin";
let taskDone = document.getElementsByClassName("fa-cicrle-thin") //element and classes for checking if the task is complete

let todoData = localStorage.getItem("task")         //Getting data from localstorage
let clearButton = document.getElementById("clear")
let count = 0;

//Loading data from local storage

if (todoData){                              //If there is data, perform loadlist function and set id for new task based on the lenghth of the list
    todoList = JSON.parse(todoData)
    id = todoList.length;
    loadlist(todoList);
} else {
    todoList = [];
    id = 0;
}

function loadlist(array){                          //Function for loading the list and displaying it
    array.forEach(function(todoTask){              //Display all the todoTasks within the array with all the properties they have
        addToDo(todoTask.name, todoTask.id, todoTask.done, todoTask.trash);
    });
}

//Function addTodo

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

    const text = `<li class = "todoTask">
                    <i class = "fa ${taskDone} co" job= "complete" id = ${id}></i>
                    <p class = "text">${toDo}</p> 
                    <i class=" fa fa-trash de" job = "delete" id = ${id}></i>
                 </li>`;

    const position = "afterbegin";                  //Adding the new todo item to the top of the list

    list.insertAdjacentHTML(position, text);       
}

//Add Todo task with pressing enter

document.addEventListener("keyup",function(event) { //Possibility to add task by pressing enter
    if (event.keyCode === 13){                      //Enter button keycode is 13 
        event.preventDefault();

        document.getElementById("submit-button").click();   //Trigger submitkeys click with enter
    }
});

//Add todo by clicking submit button

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

        localStorage.setItem("task",JSON.stringify(todoList));

        document.getElementById('feedback').innerHTML= "";  //If the input field is not empty, clear add task text and change border color to white
        let inputField = document.getElementById('input')
        inputField.style.borderColor = "grey";

        id++;                                       //Id number increases so that every list object have unique id assigned 
        count++;
        document.getElementById('counter').innerHTML = count;
    }
    if (toDo == '') {                               //If input field is empty, the page will give alert to add a task to the field
        document.getElementById('feedback').innerHTML= "<br><b>Please add task<b>";
        //alert("Please add task");
        let inputField = document.getElementById('input')
        inputField.style.borderColor = "red";       //Change inputfiel bordercolor to read if there is no input when submitting
    }
    input.value = '';                               //Clearing the input field
});

//Eventlisteners for complete and delete icons

list.addEventListener('click', function(event){     //Event listener for the list so that we can perform different functions based on what element inside of the list is clicked
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "delete") {                    //If the job attribute is delete, perform delete funtion
        deleteToDo(element);
    }
    if (elementJob == "complete") {                 //If the job attribute is complete, perform complete function
        completeToDo(element);
        moveElement(element)
    }
    localStorage.setItem("task",JSON.stringify(todoList));
});

//Delete function

function deleteToDo(element){                       //Deleting the element from page and assigning trash value for true
    element.parentNode.parentNode.removeChild(element.parentNode);
    todoList[element.id].trash = true;
}

//Complete function

function completeToDo(element){

    element.classList.toggle(uncomplete); 
    
    if (todoList[element.id].done = true){
      element.classList.toggle(complete);
      element.parentNode.style.opacity = "0.5";                //Change element opacity when it is marked done
      count = count -1;                                        //Reduce the amount of tasks left by one
      document.getElementById('counter').innerHTML = count;    //Display the new amount in counter
    } 
}

//Clear local storage

clearButton.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})