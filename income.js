const inputBox1=document.getElementById("desinput");
const inputBox2=document.getElementById("amtinput");
const addList=document.getElementById("addList");
const dropdownieValue=document.getElementById("select");
const radioValue=document.getElementsByName("myRadioGroup");
const totalincomeBox=document.querySelector(".incomeBox");
const totalexpensesBox=document.querySelector(".expenseBox");
const totalnetBox=document.querySelector(".netBox");
const initVale={
    isEditvalue:false,
    totalExpenses:0,
    totalIncome:0,
    netBalance:0,
    listofincomeandexpenses:[]
}
let isupdate=[];
localStorage.setItem("add",1)
radioValue.forEach((radio)=>{
    radio.addEventListener('change',(e)=>{
        if(e.target.value=="income"){
            addList.innerHTML="";
            const income1=initVale.listofincomeandexpenses.filter((task)=>task.option=="income");
            income1.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${id})">Edit</button>
        <button onclick="deleteTask(${id})">Delete</button>
       `;
        addList.append(li);
   
    })
        }else if(e.target.value=="expenses"){
            addList.innerHTML="";
            const income1=initVale.listofincomeandexpenses.filter((task)=>task.option=="expenses");
            income1.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${id})">Edit</button>
        <button onclick="deleteTask(${id})">Delete</button>
       `;
        addList.append(li);
   
    })

        }else{
             addList.innerHTML="";
             initVale.listofincomeandexpenses.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${id})">Edit</button>
        <button onclick="deleteTask(${id})">Delete</button>
       `;
        addList.append(li);
   
    })

        }
    })
    
})
function incomeExpensesNetBalanceHandler(){
    totalincomeBox.innerHTML="";
    const incomeValue=initVale.listofincomeandexpenses.filter((task)=>task.option=="income")
    
    .map((data)=>+(data.amount)).reduce((Acc,ele)=>Acc+ele,0);
    initVale.incomeValue=incomeValue;
    console.log(incomeValue);
    console.log( totalincomeBox);
     totalincomeBox.textContent=incomeValue.toString();
    const expenseValue=initVale.listofincomeandexpenses.filter((task)=>task.option=="expenses")
    .map((data)=>+(data.amount)).reduce((acc,ele)=>acc+ele,0);
    initVale.expenseValue=expenseValue;
     console.log(expenseValue);
    console.log(totalexpensesBox);
       totalexpensesBox.textContent=expenseValue.toString();
       const totalBal=incomeValue+expenseValue;
       initVale.totalBal=totalBal;
       totalnetBox.textContent=totalBal.toString();
       
}

function addTask(){
   
    if(inputBox1.value=="")return;
    if(inputBox2.value=="")return;
    else{
        addList.innerHTML="";
        let sumbitValue={};
        sumbitValue.id = initVale.listofincomeandexpenses.length;
        sumbitValue.describtion=inputBox1.value;
       
        sumbitValue.amount=inputBox2.value;
     
        sumbitValue.option=dropdownieValue.value;
    
        initVale.listofincomeandexpenses.push(sumbitValue);
        
       initVale.listofincomeandexpenses.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${id})">Edit</button>
        <button onclick="deleteTask(${id})">Delete</button>
       `;
        addList.append(li);
   
    })
          inputBox1.value="";
         inputBox2.value="";
   console.log(initVale);
    const a1=inputBox1.value.trim();
      
}
 incomeExpensesNetBalanceHandler();
}
function editTask(id){
const findValue=initVale.listofincomeandexpenses.find((data)=>data.id===id);
 console.log(findValue);
 //{id: 0, describtion: 'aa', amount: '300', option: 'income'}
 inputBox1.value=findValue.describtion;
 inputBox2.value=findValue.amount;
 dropdownieValue.value=findValue.option;
 isupdate.push(findValue);
 const a1=inputBox1.value.trim();


} 

function updateTask(){
    const value1=initVale.listofincomeandexpenses.map((data)=>{
        return data.id==isupdate[0].id?{...data,...{id: isupdate[0].id, describtion: inputBox1.value,  amount:inputBox2.value , option:dropdownieValue.value}} : data;
 
    })
    initVale.listofincomeandexpenses=value1;
    isupdate=[];
    console.log(value1);
     addList.innerHTML="";
    initVale.listofincomeandexpenses.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${id})">Edit</button>
        <button onclick="deleteTask(${id})">Delete</button>
       `;
        addList.append(li);
        inputBox1.value="";
         inputBox2.value="";
   
    })
    incomeExpensesNetBalanceHandler();
     const a1=inputBox1.value.trim();

}
function deleteTask(id){
    addList.innerHTML="";
    const findValue=initVale.listofincomeandexpenses.filter((data)=>data.id!==id);
    if(findValue.length==0){
     initVale.listofincomeandexpenses=[];
    }
     initVale.listofincomeandexpenses=findValue;
        
       initVale.listofincomeandexpenses.forEach((task,id) => {
        const li =document.createElement("li");
        li.innerHTML = `
        <span>${task.describtion}</span>
         <span>${task.amount}</span>
         <span>${task.option}</span>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
       `;
        addList.append(li);
   
    })
console.log(findValue);
incomeExpensesNetBalanceHandler();
}

function resetTask(){
    inputBox1.value="";
     inputBox2.value="";
     initVale.listofincomeandexpenses=[];
     sumbitValue=[];
     addList.innerHTML="";
     totalincomeBox.textContent=[];
  totalnetBox.textContent=[];
   totalexpensesBox.textContent=[];
   incomeExpensesNetBalanceHandler();
   addTask();
   editTask();
   updateTask();
   deleteTask();
   

}


