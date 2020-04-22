const addTask=document.querySelector('form')
const inputTask=document.querySelector('#task')
const collection=document.querySelector('.collection')
const clearTask=document.querySelector('.clear-tasks')
const filter=document.querySelector('#filter')
loadEventListeners();
function loadEventListeners(){

 
    //add task
addTask.addEventListener('submit',addTaskToList)
//clear task
clearTask.addEventListener('click',clearTasks)
//remove task
collection.addEventListener('click',removeTask)
//
filter.addEventListener('keyup',filterTask)
}

//add task
function addTaskToList(e){
    
    if(inputTask.value==''){
        alert('You have not entered anything')
    }
   const li= document.createElement('li')
   li.className='collection-item'
   li.appendChild(document.createTextNode(inputTask.value))
   const link=document.createElement('a')
   link.className='delete-item secondary-content'
   link.innerHTML='<i class="fa fa-remove"></i>'
   li.appendChild(link) 
   collection.appendChild(li)
   storeTaskInLocalStorage(inputTask.value)

e.preventDefault()
}

//clear task
function clearTasks(e){
    while(collection.firstChild){
        collection.removeChild(collection.firstChild)
    }
    e.preventDefault()

}

//remove task
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are you sure?'))
       e.target.parentElement.parentElement.remove();
   }
    
}
//filter task
function filterTask(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
       
        function(task){
            const item=task.firstChild.textContent
          if(item.toLowerCase().indexOf(text)!=-1){
              task.style.display='block'
          }else{
            task.style.display='none'
          }
        }
    )
   
}
//add task to local storage
function storeTaskInLocalStorage(task) {
    let tasks
    if(localStorage.getItem('tasks')===null)
    tasks=[]
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}