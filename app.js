//Define UI vars
const form = document.querySelector("#task-form");
const clearBtn = document.querySelector(".clear-tasks");
const filterTasks = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListener();

//function loadEventListener
function loadEventListener() {

    //DOM content loaded
    document.addEventListener("DOMContentLoaded", getTasks);

    //Add task event
    form.addEventListener("submit", addTask);

    //Remove task event(removing individual tasks)
    taskList.addEventListener("click", removeTask); // We are going to use event delegation here so we applied the event listener on the parent itself

    //Clear tasks(deleting all at once)
    clearBtn.addEventListener("click", clearTasks);

    //Filter tasks
    filterTasks.addEventListener("keyup", filterTask);
}

//Get tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        //create li element
        const li = document.createElement("li");
        //add class
        li.className = "collection-item";
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create a link 
        const link = document.createElement("a");
        //add class
        link.className = "delete-item secondary-content";
        //add icon in html
        link.innerHTML = '<i class="far fa-trash-alt"></i>';
        //append link to li
        li.appendChild(link);
        //apppend li to ul
        taskList.appendChild(li);
    });
}


//addTask function
function addTask(e) {

    if (taskInput.value === "") {
        alert("Nothing entered");
    }

    //create li element
    const li = document.createElement("li");

    //add class
    li.className = "collection-item";

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //create a link 
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon in html
    link.innerHTML = '<i class="far fa-trash-alt"></i>';

    //append link to li
    li.appendChild(link);
    
    //apppend li to ul
    taskList.appendChild(li);

    //Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = "";

    e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//removeTask function
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();//The parent element here is the a tag then its parent is the li tag which we want to remove
        }
    }
}

//clearTasks function
function clearTasks(e) {
    //taskList.innerHTML = "";

    //Faster way to do the same thing is using a while loop(We can even use the above method doesnt matter much)
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

//filterTasks function
function filterTask(e) {
    const text = e.target.value.toLowerCase();//Converting all values to lowercase

    //We can use forEach on the ".collection-item " as it returns the nodelist which we can iterate through
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent; //We get the text content by iterating 
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    });
}