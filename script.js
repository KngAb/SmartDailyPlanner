const task = document.querySelector(".task");
const addTask = document.querySelector(".add-task");
const undoneTask = document.querySelector(".all-task");
const allTask = document.querySelector(".eve-task");
const compTask = document.querySelector(".complete");
const mor = document.querySelector(".Morning");
const aft = document.querySelector(".Afternoon");
const eve = document.querySelector(".Evening");
const comp = document.querySelector(".Completed");
const prio = document.querySelector(".priority");
const mTask = document.querySelector(".m-task");
const aTask = document.querySelector(".a-task");
const eTask = document.querySelector(".e-task");
const cTask = document.querySelector(".c-task");
let dat = document.querySelector(".date");
let da = new Date();
dat.innerHTML = da.toDateString();


allTask.addEventListener("click",()=>{
   allTask.style.color = "var(--accent2)";
   undoneTask.style.color = "var(--accent1)"
   compTask.style.color = "var(--accent1)"
   prio.style.color = "var(--accent1)"
    mor.style.display = "block";
    aft.style.display = "block";
    eve.style.display = "block";
    comp.style.display = "block";
    display();
})


undoneTask.addEventListener("click",()=>{
   undoneTask.style.color = "var(--accent2)"
   allTask.style.color = "var(--accent1)"
   compTask.style.color = "var(--accent1)"
   prio.style.color = "var(--accent1)"
    display();
    mor.style.display = "block";
    aft.style.display = "block";
    eve.style.display = "block";
    comp.style.display = "none";
})


compTask.addEventListener("click",()=>{
   compTask.style.color = "var(--accent2)"
   undoneTask.style.color = "var(--accent1)"
   allTask.style.color = "var(--accent1)"
   prio.style.color = "var(--accent1)"

    display()
    mor.style.display = "none";
    aft.style.display = "none";
    eve.style.display = "none"; 
    comp.style.display = "block";
})


prio.addEventListener("click",()=>{
   prio.style.color = "var(--accent2)"
   undoneTask.style.color = "var(--accent1)"
   compTask.style.color = "var(--accent1)"
   allTask.style.color = "var(--accent1)"

    display()
    mor.style.display = "none";
    aft.style.display = "none";
    eve.style.display = "none"; 
    comp.style.display = "none";

    const taske = JSON.parse(localStorage.getItem("task",)) || [];


    mTask.innerHTML = " ";
    aTask.innerHTML = " ";
    eTask.innerHTML = " ";
    cTask.innerHTML = " ";
   

    const priorityTask = taske.filter(t=> t.Priority == "priority");


    priorityTask.forEach((t,index) => {
        const li = document.createElement('li');
         const check = document.createElement('input');
         check.type = "checkbox"
        const del = document.createElement('button');
         del.innerHTML = "X"
         del.addEventListener("click", ()=>x(index));
         check.addEventListener("change",()=>clicked(index))
         li.innerHTML = `${index+1}. ${t.Task} ${t.Time}`;
         li.prepend(check);
         li.append(del);

         if(t.Time=="Morning" ){
          mTask.appendChild(li);
            mor.style.display = "block";
   
         }else if(t.Time=="Afternoon"){
          aTask.appendChild(li);
           aft.style.display = "block";
   
         }else if(t.Time=="Evening"){
          eTask.appendChild(li);
           eve.style.display = "block";
         }
        })
    if (priorityTask.length === 0) {
        const msg = document.createElement("p");
        const ms = document.createElement("p");
        const mg = document.createElement("p");
        msg.textContent = "No priority tasks found.";
        ms.textContent = "No priority tasks found.";
        mg.textContent = "No priority tasks found.";
        msg.style.textAlign = "center";
        msg.style.color = "#888";
        ms.style.color = "#888";
        mg.style.color = "#888";
        mTask.appendChild(msg);
        aTask.appendChild(ms);
        eTask.appendChild(mg);
        mor.style.display = "block";
        aft.style.display = "block";
        eve.style.display = "block";
    }
})


task.addEventListener("click",()=>{
   addTask.classList.toggle("show")
})


addTask.addEventListener('submit',()=>{
    event.preventDefault();
    const taskInput=document.getElementById('task-input').value;
    const time = document.querySelector('input[name="time"]:checked').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;

    let tasks = JSON.parse(localStorage.getItem("task")) ||[];
    
    const taskData ={
        Task: taskInput,
        Time: time,
        Priority: priority
    };

    tasks.push(taskData);



    localStorage.setItem("task",JSON.stringify(tasks));
    display();
})

function display(){
    const taskse = JSON.parse(localStorage.getItem("task")) ||[];
    const dtaskse = JSON.parse(localStorage.getItem("dtask")) ||[];

    mTask.innerHTML = " ";
    aTask.innerHTML = " ";
    eTask.innerHTML = " ";
    cTask.innerHTML = " ";
    
        taskse.forEach((t,index) => {
         const li = document.createElement('li');
         const del = document.createElement('button');
         del.innerHTML = "X"
         const check = document.createElement('input');
         check.type = "checkbox"
         check.addEventListener("change",()=>clicked(index))
         del.addEventListener("click", ()=>x(index));

         li.innerHTML = `${index+1}. ${t.Task} ${t.Time}`;
         li.prepend(check);
         li.append(del);
         if(t.Time=="Morning"){
          mTask.appendChild(li);
         }else if(t.Time=="Afternoon"){
            aTask.appendChild(li);

         }else if(t.Time="Evening"){
            eTask.appendChild(li);
         }
        })
    
    dtaskse.forEach((dt,index) =>{
        const li = document.createElement('li');
        const check = document.createElement('input');
        check.type = "checkbox" ;
        check.checked = true
        check.addEventListener("change",()=>unclicked(index))
        li.innerHTML = `${index+1}. ${dt.Task} ${dt.Time}`;
        li.prepend(check);
        cTask.appendChild(li);
    })
}


function clicked(index){
    const taskse = JSON.parse(localStorage.getItem("task")) ||[];
    const dtaskse = JSON.parse(localStorage.getItem("dtask")) ||[];

    const [movedItem] = taskse.splice(index,1);
    dtaskse.push(movedItem);

    localStorage.setItem("task", JSON.stringify(taskse));
    localStorage.setItem("dtask", JSON.stringify(dtaskse));
   
    display();
}


function unclicked(index){
    const taskse = JSON.parse(localStorage.getItem("task")) ||[];
    const dtaskse = JSON.parse(localStorage.getItem("dtask")) ||[];

    const [movedItem] = dtaskse.splice(index,1);
    taskse.push(movedItem);

    localStorage.setItem("task", JSON.stringify(taskse));
    localStorage.setItem("dtask", JSON.stringify(dtaskse));
   
    display();
}


function x(index){
    const taske = JSON.parse(localStorage.getItem("task")) || [];
    taske.splice(index,1);
    localStorage.setItem("task", JSON.stringify(taske));
    display();
}

function clear(){
    let taske = JSON.parse(localStorage.getItem("task")) || [];
    let dtaske = JSON.parse(localStorage.getItem("dtask")) || [];
    taske = [];
    dtaske = [];
    localStorage.setItem("task", JSON.stringify(taske));
    localStorage.setItem("dtask", JSON.stringify(dtaske));
    display();
}

const clr = document.querySelector('.clr');
clr.addEventListener('click',()=>clear());

display();