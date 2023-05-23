const toDoForm =document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const todobox = document.querySelector(".todobox");
const todoCount=document.querySelector(".todocount");
const allclear = document.querySelector(".allclear");
let Todos=[];

toDoForm.addEventListener("submit", addToDo);


function clear(event){ //모두 없애는 함수
    while(todobox.hasChildNodes()){
        todobox.removeChild(todobox.firstChild);
    }
    todoCount.innerText=` 할 일:0개`
    Todos=[];
    Savetodos();
}

function addLine (event) // circle누르면 완료 표시 
{
    const li = event.target.parentElement;
    let circle =li.querySelector('img');
    let div = li.querySelector('div');

    if (circle.getAttribute('src') == "circle.png")
    {
        circle.src="check.png";
        div.style.textDecoration = "line-through";
        div.style.textDecorationColor = "black";
        div.style.color="#606060";
    }   
    else {
         circle.src="circle.png";
         div.style.textDecoration = "";
         div.style.color="black";          
    }
}

function deleteToDo(event){ // x버튼 누르면 삭제
    const li =event.target.parentElement;
    li.remove();
    Todos = Todos.filter(item => item.id !== parseInt(li.id));
    Savetodos();
    const count = document.querySelectorAll("li").length;
    todoCount.innerText=` 할 일:${count}개` 
}

function Savetodos()
{
    localStorage.setItem("todolist",JSON.stringify(Todos));
}

function changeToDo(event){
    const todo = event.target.closest("li");
    const updateToDo=prompt("할 일을 수정하세요",todo.querySelector("div").innerText);
    if (updateToDo ==="")
    {
        alert("내용을 입력하세요");
    }
    else
    {   event.target.closest("li").querySelector("div").innerText = updateToDo;
        todoIndex =Todos.findIndex((item => item.id == todo.id));
        Todos[todoIndex].text =event.target.closest("li").querySelector("div").innerText;
    Savetodos();
}
   
}

function PaintToDo(newtodo)
{
    const li = document.createElement("li");
    const div = document.createElement("div");
    const circle = document.createElement("img");
    const btn_x = document.createElement("button");
    const count = document.querySelectorAll("li").length+1;
    const btn_change = document.createElement("button");

    div.innerText=newtodo.text;
    circle.src="circle.png";
    btn_x.innerText="X";
    li.className="todoli"
    btn_x.className="btn_x";
    li.id=newtodo.id;
    btn_change.innerText="수정";
    btn_change.className="btn_change";

    li.appendChild(circle);
    li.appendChild(div);
    li.appendChild(btn_change);
    li.appendChild(btn_x);


    todobox.appendChild(li);
    toDoInput.value="";
    todoCount.innerText=` 할 일:${count}개`
    Savetodos();
    
    circle.addEventListener("click",addLine);
    btn_x.addEventListener("click",deleteToDo);
    allclear.addEventListener("click",clear);
    btn_change.addEventListener("click",changeToDo);
 
}

function addToDo(event){
    event.preventDefault();
   
    const newToDo = toDoInput.value;
    const newTodoObj={
        text:newToDo,
        id:Date.now(),
    };
    Todos.push(newTodoObj);

    if (newToDo === "" )
    {
        alert("내용을 입력하세요")
    }

    else {
       PaintToDo(newTodoObj);
    }

}


const savedToDos = localStorage.getItem("todolist");

if (savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos); //string을 배열로 바꿔줌
    Todos = parsedToDos;
    parsedToDos.forEach(PaintToDo);
}


