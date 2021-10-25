// Define our UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');




// Load All Event Listenrs 
loadEventListeners();

// Load All Event Listenrs 
function loadEventListeners(){
    // DOM Load Event 
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task Event 
    taskList.addEventListener('click', removeTask);
    // Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event 
    filter.addEventListener('keyup', filterTasks)
}




// Functions 
// Get Tasks From Local Storage 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);
  
      // Append li to ul
      taskList.appendChild(li);
    });
  }
  




// 1- Add Task
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task')
    }

    // Create li element 
    const li = document.createElement('li');
    // Add class 
    li.className = 'collection-item';
    // create text node and apend to li
    li.appendChild(document.createTextNode(taskInput.value));
    //====================================================
    // craete new link element
    const link = document.createElement('a');
    // Add Class 
    link.className = 'delete-item secondary-content';
    // Add Icon 
    link.innerHTML = `<i class="fa fa-remove"></i>`
    // Append link To li Element 
    li.appendChild(link);
    //====================================================
    // Append Li To Ul
    taskList.appendChild(li);

    // Store IN Local Storage
    storeTaskLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = '';


    e.preventDefault(); 
}

function storeTaskLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//====================================================
//2- Remove Task function 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure ?')){
            e.target.parentElement.parentElement.remove();
            
            // Remove From Local Storage 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove from Local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//====================================================
//3- Clear Tasks function 
function clearTasks(){
    // taskList.innerHTML = '';

    //Looping
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }


    // Clear From Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//====================================================
//4- Filter Tasks function 
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })

}