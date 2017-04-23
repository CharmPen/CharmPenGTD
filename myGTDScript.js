/* test data */
/*var todoList = [
    {id:1, value:"project 1 to do 1."},
    {id:2, value:"project 1 to do 2."},
    {id:3, value:"project 2 to do 1."}
]
*/
var inputList = [
    {id:1, value:"input 1"},
    {id:2, value:"input 2"}
]

var proList = [
    {id:1, value:"project 1"},
    {id:2, value:"project 2"},
    {id:3, value:"project 3"}
]

var stepList = [
    {id:1, value:"project 1 to do 1", proId:1, state:"next"},
    {id:2, value:"project 2 to do 1", proId:2, state:"next"},
    {id:3, value:"project 3 to do 1", proId:3, state:"plan"},
    {id:4, value:"project 1 to do 2", proId:1, state:"next"},
    {id:5, value:"project 2 to do 2", proId:2, state:"finish"}
]

/* global veriable *pageMode = "view"; /* view, plan */
DISPMODE = "VIEW"; /* VIEW, PLAN */
window.onload = init;

function init() {
    var selProId;
/*
    var ul = document.getElementById("todoList");
    for (var ind=0; ind<todoList.length; ind++) {
        var li = document.createElement("li");
        li.setAttribute("id", todoList[ind].id);
        li.innerHTML = todoList[ind].value;
        ul.appendChild(li);
    }
*/
/* menu setting */
    var menu = document.getElementById("changeInptDisp");
    menu.onclick = ClickInptDisp;
    
    var ul = document.getElementById("inputList");
    for (var ind=0; ind<inputList.length; ind++) {
        var li = document.createElement("li");
        li.setAttribute("id", inputList[ind].id);
/*        alert(inputList[ind].id); */
        li.innerHTML = inputList[ind].value;
/*        li.onclick = ClickInptItem; */
        li.ondblclick = DbClickItem;

        ul.appendChild(li);
    }
        
/* show all data and set all ul */
    var ul = document.getElementById("proList");
    for (var ind=0; ind<proList.length; ind++) {
        var li = document.createElement("li");
        li.setAttribute("id", proList[ind].id);
        li.innerHTML = proList[ind].value;
        li.onclick = ClickProItem;
        li.ondblclick = DbClickItem; 

        ul.appendChild(li);
    }

    var ulPro = document.getElementById("proDetails"); 
    var ulTodo = document.getElementById("todoList");
    /*alert(ulTodo);*/
    for (var ind=0; ind<stepList.length; ind++) {
        if( (stepList[ind].state != "finish") && stepList[ind].proId == selProId ) {
            var li = document.createElement("li");
            li.setAttribute("id", stepList[ind].id);
            li.innerHTML = stepList[ind].value;
            li.ondblclick = DbClickItem; 
            li.onclick = ClickStepItem;
            ulPro.appendChild(li);
        }
        if (stepList[ind].state == "next") {
            var li = document.createElement("li");
            li.setAttribute("id", stepList[ind].id);
            li.innerHTML = stepList[ind].value;
            li.ondblclick = DbClickItem; 
            li.onclick = ClickStepItem;
            ulTodo.appendChild(li);
        }
    }
}

/* UI control */
function ClickInptDisp() {
/*    alert(this.id);*/
    var inputDiv = document.getElementById("inputContainer");
/*    alert(inputDiv.id); */
    var detailDiv = document.getElementById("detailsContainer");
/*    alert(detailDiv.id); */
    var topNewInptDiv = document.getElementById("topNewInpt");
/*    alert(topNewInptDiv); */
    if( this.classList.contains("showInpt") ){
        this.classList.remove("showInpt");
        this.innerHTML = "InputBox";
        inputDiv.style.display = "none";
        detailDiv.style.display = "inline-block";
        DISPMODE = "PLAN";
        topNewInptDiv.style.visibility = "visible";
    }
    else {
        this.classList.add("showInpt");
        this.innerHTML = "Details";
        inputDiv.style.display = "inline-block";
        detailDiv.style.display =  "none";
        DISPMODE = "VIEW";
        HighlightStep("null");
        ChangeSelPro("null");
        topNewInptDiv.style.visibility = "hidden";
    }
}

/* control */
/* select project */
function ClickProItem() {
    var selProId = this.id;
    
    /*alert(selProId); */
    if( DISPMODE == "VIEW" ) return;

    if(!this.classList.contains("selPro")) {
        ChangeSelPro( selProId );
        HighlightStep("null");
/*        var ulPro = this.parentNode; 
        for(var ind=0; ind < ulPro.children.length; ind++ ){
            if( ulPro.children[ind].classList.contains("selPro")){
                ulPro.children[ind].classList.remove("selPro");
                break;
            }
        }
        this.classList.add("selPro");

        var ulStep = document.getElementById("proDetails");
        for(var ind= ulStep.children.length-1; ind>=0; ind-- ) {
            ulStep.removeChild(ulStep.children[ind]);
        }
        for(var ind=0; ind<stepList.length; ind++) {
            if((stepList[ind].state != "finish") && stepList[ind].proId == selProId) {
                var li = document.createElement("li");
                li.setAttribute("id", stepList[ind].id);
                li.innerHTML = stepList[ind].value; 
                li.ondblclick = DbClickItem;
                li.onclick = ClickStepItem;
                ulStep.appendChild(li);
            }
        }
*/
    }
}
/* select step item */
function ClickStepItem() {

    if( DISPMODE == "VIEW" ) return;

    var id = this.id;
    var proId = getProId(id);
/*    alert(id); */
    ChangeSelPro(proId);
    HighlightStep(id);
}

function getProId(stepId) {
/*    alert(stepId); */
    for(var ind=0; ind<stepList.length; ind++) {
        if(stepList[ind].id == stepId)
            return stepList[ind].proId;
    }
}

function ChangeSelPro(proId){
/*    alert(proId); */
    var ulPro = document.getElementById("proList"); 
    var proExist = false;
    for(var ind=0; ind < ulPro.children.length; ind++ ){
        if( ulPro.children[ind].classList.contains("selPro")){
            ulPro.children[ind].classList.remove("selPro");
        }
        if(ulPro.children[ind].id == proId) {
            ulPro.children[ind].classList.add("selPro");
            proExist = true;
        }
    }

    var ulStep = document.getElementById("proDetails");
/*        alert(ulStep.children.length);*/
    for(var ind= ulStep.children.length-1; ind>=0; ind-- ) {
/*            alert(ind); */
        ulStep.removeChild(ulStep.children[ind]);
    }

    if( !proExist ) return;

    for(var ind=0; ind<stepList.length; ind++) {
        if((stepList[ind].state != "finish") && stepList[ind].proId == proId) {
            var li = document.createElement("li");
            li.setAttribute("id", stepList[ind].id);
            li.innerHTML = stepList[ind].value; 
            li.ondblclick = DbClickItem;
            li.onclick = ClickStepItem;
            ulStep.appendChild(li);
        }
    }
}

function HighlightStep(id){
    var ul = document.getElementById("todoList")
    for(var ind=0; ind<ul.children.length; ind++) {
        if( ul.children[ind].id == id )
            ul.children[ind].classList.add("selStep");
        else if( ul.children[ind].classList.contains("selStep") )
            ul.children[ind].classList.remove("selStep");
        else {};
    }
    var ul = document.getElementById("proDetails")
    for(var ind=0; ind<ul.children.length; ind++) {
        if( ul.children[ind].id == id ){
            ul.children[ind].classList.add("selStep");
        }
    }
}

/* add new contant */
function newLiItem(inptBox) {
    /*alert("Func newLiItem"); */
    /* alert(inptBox.parentElement.id); */
    var newValue = inptBox.value;
    
    if( newValue == "" ) return;

    if( inptBox.id == "topNewInptTxt"){
        var ul = document.getElementById("inputList");
    }
    else{
        var uls = inptBox.parentElement.getElementsByTagName("ul");
        var ul = uls[0];
    }
    /*alert(ul); */ 
    if(ul.id == "proDetails") {
        var selPros = document.getElementById("proList").getElementsByClassName("selPro");
        if( selPros.length == 0){
            alert("Please select the project");
            return;
        }
        var proId = selPros[0].id;
    }

    var today = new Date();
    var id = today.getTime();
    /*alert(id); */
    var li = document.createElement("li");
    li.setAttribute("id", id);
    li.innerHTML = inptBox.value;
    li.ondblclick = DbClickItem; 
    
    
    
    if(ul.id == "proDetails" ) {
        addStep(id, newValue, proId);
        li.onclick = ClickStepItem;

    }
    else if(ul.id == "proList") {
        addPro(id, newValue);
        li.onclick = ClickProItem;
    }
    else if(ul.id == "inputList") {
        addInput( id, newValue);
        /*li.onclick = ClickStepItem; */
    }

    ul.appendChild(li);
    inptBox.value = "";

}

/* modify contant */
var inpt = document.createElement("input");
inpt.setAttribute("type", "text");
inpt.setAttribute("id", "inputBox");
inpt.onblur = function() {
    var itemLi = this.parentElement;
    var newValue = inpt.value;

/*    alert(newValue); */ 

    ul = itemLi.parentElement;
/*    alert(ul.id); */
    if( ul.id == "todoList" ) {
        /* change next step, then change project details at the same time */
        ulToUpdate = document.getElementById("proDetails");
        updateUlList(ulToUpdate, itemLi.id, newValue);
        updateStepValue(itemLi.id, newValue);
    }
    else if(ul.id == "proDetails" ) {
        /* change project details, then change next step list at the same time */
        ulToUpdate = document.getElementById("todoList");
        updateUlList(ulToUpdate, itemLi.id, newValue);
        updateStepValue(itemLi.id, newValue);
    }
    else if(ul.id == "proList") {
        updateProValue(itemLi.id, newValue);
    }
    else if(ul.id == "inputList") {
        updateInptValue( itemLi.id, newValue);
    }

    itemLi.innerHTML = newValue;

}

document.onkeypress = function(e) {
    var ev= (typeof event != 'undefined' )? window.event : e;
   /* alert(document.activeElement.classList); */
    if(ev.keyCode == 13 && document.activeElement.id == "inputBox"){
        document.activeElement.blur();
    }
    else if(ev.keyCode == 13 && document.activeElement.classList.contains("newItemInpt") ) {
        newLiItem(document.activeElement);
    }
}

function DbClickItem() {
    
/*    alert("DbClickItem"); */
    inpt.value = this.innerHTML;
    this.removeChild(this.firstChild);
    this.appendChild(inpt);
    inpt.focus();
    
}

function updateUlList( ul, id, newValue ) {
    for(var ind = 0; ind<ul.children.length; ind++){
        if(ul.children[ind].id == id){
            ul.children[ind].innerHTML = newValue;
            break;
        }
    }
}

/* data operation*/
function updateStepValue(id, newValue) {
    for(var ind=0; ind<stepList.length; ind++){
        if(stepList[ind].id == id) {
            stepList[ind].value = newValue;
            break;
        }
    }
/*    alert(stepList[ind].value); */
}

function updateProValue(id, newValue) {
    for(var ind=0; ind<proList.length; ind++){
        if(proList[ind].id == id) {
            proList[ind].value = newValue;
            break;
        }
    }
}

function updateInptValue( id, newValue ) {
    for(var ind=0; ind<inputList.length; ind++) {
        if(inputList[ind].id == id) {
            inputList[ind].value = newValue;
            break;
        }
    }
}

function addStep(id, newValue, proId) {
    var newStep = {};
    newStep.id = id;
    newStep.value = newValue;
    newStep.proId = proId;
    newStep.state = "plan";
    stepList.push(newStep);
}

function addPro(id, newValue) {
    var newPro = {};
    newPro.id = id;
    newPro.value = newValue;
    proList.push(newPro);

}

function addInput( id, newValue) {
    var newInput = {};
    newInput.id = id;
    newInput.value = newValue;
    inputList.push(newInput);
    /*alert(inputList[inputList.length-1].id); */
}
