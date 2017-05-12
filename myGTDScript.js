/* test data */
/*var todoList = [
    {id:1, value:"project 1 to do 1."},
    {id:2, value:"project 1 to do 2."},
    {id:3, value:"project 2 to do 1."}
]
*/
var inputList = [
    {id:91, value:"input 1"},
    {id:92, value:"input 2"}
]

var proList = [
    {id:1, value:"project 1"},
    {id:2, value:"project 2"},
    {id:3, value:"project 3"},
    {id:4, value:"project 4"}
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
/* for test */
/*    var downMenu = document.getElementById("downMenuTest");
    downMenu.onclick = function() {
        event.cancelBubble = true;
        var li = this.parentElement;
        var div=li.parentElement.parentElement.parentElement;
        var downDivs = div.getElementsByClassName("downMenuContainer");
        var downDiv = downDivs[0];
        if( downDiv.style.display == "none") {
            downDiv.style.top = this.offsetTop + 20 + 'px';
            downDiv.style.left = this.offsetLeft;
            downDiv.style.display = "block";
        }
        else if( downDiv.style.display == "block" ) {
            downDiv.style.display = "none";
        }
    }
    var menu = document.getElementById("downMenu");
    menu.children[0].onclick = function() {
        alert(this);
        alert(this.index);
    }
*/
    document.onclick = docOnclick;

/* menu setting */
    var menu = document.getElementById("changeInptDisp");
    menu.onclick = ClickInptDisp;
    
    var dwnMenu = document.getElementById("inputDownMenu");
    for(var ind=0; ind<dwnMenu.children.length; ind++){
        dwnMenu.children[ind].onclick = clickInptDwnMenu;
    }

    var dwnMenu = document.getElementById("todoDownMenu");
    for(var ind=0; ind<dwnMenu.children.length; ind++){
        dwnMenu.children[ind].onclick = clickTodoDwnMenu;
    }

    var dwnMenu = document.getElementById("proDownMenu");
    for(var ind=0; ind<dwnMenu.children.length; ind++){
        dwnMenu.children[ind].onclick = clickProDwnMenu;
    }

    var dwnMenu = document.getElementById("dtlDownMenu");
    for(var ind=0; ind<dwnMenu.children.length; ind++){
        dwnMenu.children[ind].onclick = clickDtlDwnMenu;
    }
/* show all data and set all ul */
    var ul = document.getElementById("inputList");
    for (var ind=0; ind<inputList.length; ind++) {
        var li = document.createElement("li");
        newLiGen(li,inputList[ind].id, inputList[ind].value);
        li.onclick = ClickInptItem;
        ul.appendChild(li);
    }
        

    var ul = document.getElementById("proList");
    for (var ind=0; ind<proList.length; ind++) {
        var li = document.createElement("li");
        newLiGen(li,proList[ind].id,proList[ind].value);
        li.onclick = ClickProItem;
        ul.appendChild(li);
    }

    var ulPro = document.getElementById("proDetails"); 
    var ulTodo = document.getElementById("todoList");
    /*alert(ulTodo);*/
    for (var ind=0; ind<stepList.length; ind++) {
/*        if( (stepList[ind].state != "finish") && stepList[ind].proId == selProId ) {
            var li = document.createElement("li");
            newLiGen(li, stepList[ind].id,stepList[ind].value);
            li.onclick = ClickStepItem;
            ulPro.appendChild(li);
        } */
        if (stepList[ind].state == "next") {
            var li = document.createElement("li");
            newLiGen(li, stepList[ind].id,stepList[ind].value);
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
    /*if( DISPMODE == "VIEW" ) return; */

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

    /*if( DISPMODE == "VIEW" ) return; */

    var id = this.id;
    var proId = getProId(id);
/*    alert(id); */
    ChangeSelPro(proId);
    HighlightStep(id);
}

function ClickInptItem(){
    var id = this.id;
    var ul = document.getElementById("inputList")
    for(var ind=0; ind<ul.children.length; ind++) {
        if( ul.children[ind].id == id )
            ul.children[ind].classList.add("selInpt");
        else if( ul.children[ind].classList.contains("selInpt") )
            ul.children[ind].classList.remove("selInpt");
        else {};
    }
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
        if( ulPro.children[ind].classList.contains("selPro") && ulPro.children[ind].id == proId){
            return;

        }
        else if( ulPro.children[ind].classList.contains("selPro")){
            ulPro.children[ind].classList.remove("selPro");
        }
        else if(ulPro.children[ind].id == proId) {
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
            newLiGen(li, stepList[ind].id, stepList[ind].value);
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
        else if( ul.children[ind].classList.contains("selStep") )
            ul.children[ind].classList.remove("selStep");
        else {};
    }
}

function clickInptDwnMenu(){
    var menuId = this.id;
    var ul = document.getElementById("inputList");
    if(menuId == "inputMdy"){
        /*alert(ul.id);*/
        for(var ind=0; ind<ul.children.length; ind++){
            if(ul.children[ind].classList.contains("selInpt") ) {
                ul.children[ind].ondblclick();
                break;
            }
        } 
    }
    else if( menuId == "inputAddPro"){
       
        var li = getSelLi(ul, "selInpt");
        var span = li.getElementsByTagName("span").item(0);
        li.removeChild(span);
        var value = li.innerHTML;
        var id = li.id;
        if( !rmInpt(id) ) {
            alert("Fail to move this item to project list.");
            return
        }
        

        var proUl = document.getElementById("proList");
        var proLi = document.createElement("li");
        newLiGen(proLi, id, value);
        proLi.onclick = ClickProItem;
        if( !addPro(id, value) ){
            alert("Fail to add this item to project list.");
            return;
        }

        ul.removeChild(li);
        proUl.appendChild(proLi);

        ChangeSelPro(proLi.id);

    }
    else if( menuId == "inputDel" || menuId == "inputFnsh"){
        var li = getSelLi(ul,"selInpt");
        if( !rmInpt(li.id) ) {
            alert("Fail to move this item to project list.");
            return false;
        }
        ul.removeChild(li); 
    }
    else if(menuId == "inputAddNxt"){
        var li = getSelLi(ul, "selInpt")
        var span = li.getElementsByTagName("span").item(0);
        li.removeChild(span);
        var value = li.innerHTML;
        var id = li.id;
        if( !rmInpt(id) ) {
            alert("Fail to move this item to project list.");
            return
        }

        var proUl = document.getElementById("proList");
        var proLi = document.createElement("li");
        newLiGen(proLi, id, value);
        proLi.onclick = ClickProItem;
        if( !addPro(id, value) ){
            alert("Fail to add this item to project list.");
            return;
        }

        var today = new Date();
        var stepId = today.getTime();
        var dtlUl = document.getElementById("proDetails");
        var todoUl = document.getElementById("todoList");
        var stepLi = document.createElement("li");
        newLiGen(stepLi, stepId, value);
        stepLi.onclick = ClickStepItem;
        if( !addStep(stepId, value, proLi.id, "next") ){
            alert("Fail to add this item to project list.");
            return;
        }

        ul.removeChild(li);
        proUl.appendChild(proLi);
        dtlUl.appendChild(stepLi);
        todoUl.appendChild(stepLi);

        ChangeSelPro(proLi.id);

    }
        
}

function getSelLi(ul, className){
    for(var ind=0; ind<ul.children.length; ind++)
        if(ul.children[ind].classList.contains(className))
            return ul.children[ind];

    alert("fail to get slected item");
    return null;

}

function clickTodoDwnMenu(){
    var menuId = this.id;
    var ul = document.getElementById("todoList");
    if(menuId == "todoMdy"){
        var li = getSelLi(ul, "selStep");
        li.ondblclick();
    }
    else if( menuId == "todoRm") {
        var li = getSelLi(ul, "selStep");
        if( !updateStepState(li.id, "plan") ) {
            alert("Fail to remove the step from next list.");
            return false;
        }

        ul.removeChild(li); 
    }
    else if( menuId == "todoFnsh") {
        var li = getSelLi(ul, "selStep");
        if( !updateStepState(li.id, "finish") ) {
            alert("Fail to remove the step from next list.");
            return false;
        }

        ul.removeChild(li); 

        dtlUl = document.getElementById("proDetails");
        var dtlLi = getSelLi(dtlUl, "selStep");
        dtlUl.removeChild(dtlLi);
    }
    else if( menuId == "todoDel") {
        var li = getSelLi(ul, "selStep");
        if( !rmStep(li.id) ) {
            alert("Fail to remove the step from next list.");
            return false;
        }

        ul.removeChild(li); 

        dtlUl = document.getElementById("proDetails");
        var dtlLi = getSelLi(dtlUl, "selStep");
        dtlUl.removeChild(dtlLi);
    }
}

function clickProDwnMenu(){
    var menuId = this.id;
    var ul = document.getElementById("proList");
    if(menuId == "proMdy"){
        
        for(var ind=0; ind<ul.children.length; ind++){
            if(ul.children[ind].classList.contains("selPro")){
                ul.children[ind].ondblclick();
                break;
            }
        }
    }
    else if( menuId == "proDel" || menuId == "proFnsh"){
        var li = getSelLi(ul, "selPro");
        var proId = li.id;

        if( !rmProById(proId) ){
            alert("fail to delete project data");
            return false;
        }

        ul.removeChild(li);

        var ulTodo = document.getElementById("todoList");
        var ulDtl = document.getElementById("proDetails");
        ulTodo.innerHTML = "";
        ulDtl.innerHTML = "";
    /*alert(ulTodo);*/
        for (var ind=0; ind<stepList.length; ind++) {
            if (stepList[ind].state == "next") {
                var li = document.createElement("li");
                newLiGen(li, stepList[ind].id,stepList[ind].value);
                li.onclick = ClickStepItem;
                ulTodo.appendChild(li);
            }
        }
    }
    else if( menuId == "proAddNxt" ){
        var li = getSelLi(ul, "selPro");
        var proId = li.id;

        var stepsAll = findStepsByProid(proId);

        if( stepsAll.length > 0){
            alert("please delete all the steps of this project");
            return false;
        }

        var txt = li.firstChild["innerText" in li.firstChild ? "innerText" : "textContent"];
        var today = new Date();
        var id = today.getTime();
        if( !addStep(id, txt, proId, "next") ){
            alert("Fail to add this item to project step.");
            return;
        }
        ChangeSelPro(proId);
        
        var li = document.createElement("li");
        var ulTodo = document.getElementById("todoList");
        newLiGen(li, id, txt);
        li.onclick = ClickStepItem;
        ulTodo.appendChild(li);

        var li = document.createElement("li");
        var dtlTodo = document.getElementById("proDetails");
        newLiGen(li, id, txt);
        li.onclick = ClickStepItem;
        dtlTodo.appendChild(li);
    }
}

function clickDtlDwnMenu(){
    var menuId = this.id;
    var ul = document.getElementById("proDetails");
    if(menuId == "dtlMdy"){
        for(var ind=0; ind<ul.children.length; ind++){
            if(ul.children[ind].classList.contains("selStep")){
                ul.children[ind].ondblclick();
                break;
            }
        }
    }
    else if( menuId == "dtlAddNxt") {
        var li = getSelLi( ul, "selStep" );
        if( !updateStepState(li.id, "next") ) {
            alert("Fail change the step state.");
            return false;
        }

        var txt = li.firstChild["innerText" in li.firstChild? "innerText" : "textContent"];
        var todoUl = document.getElementById("todoList");
        var todoLi = document.createElement("li");
        newLiGen(todoLi, li.id, txt);
        todoLi.onclick = ClickStepItem;
        todoUl.appendChild(todoLi);
    }
    else if( menuId == "dtlFnsh") {
        var li = getSelLi( ul, "selStep" );
        if( !updateStepState(li.id, "finish") ) {
            alert("Fail change the step state.");
            return false;
        }
        var todoUl = document.getElementById("todoList");
        var todoLi = getSelLi( todoUl, "selStep" );
        todoUl.removeChild(todoLi);

        ul.removeChild(li);
    }
    else if( menuId == "dtlDel") {
        var li = getSelLi( ul, "selStep" );
        if( !rmStep(li.id) ) {
            alert("Fail delete the step.");
            return false;
        }
        var todoUl = document.getElementById("todoList");
        var todoLi = getSelLi( todoUl, "selStep" );
        todoUl.removeChild(todoLi);

        ul.removeChild(li);
    }

}
/* add new contant */
function newItem(inptBox) {
    /*alert("Func wItem"); */
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
    newLiGen(li, id, inptBox.value); 
    if(ul.id == "proDetails" ) {
        addStep(id, newValue, proId, "plan");
        li.onclick = ClickStepItem;

    }
    else if(ul.id == "proList") {
        addPro(id, newValue);
        li.onclick = ClickProItem;
    }
    else if(ul.id == "inputList") {
        addInput( id, newValue);
        li.onclick = ClickInptItem;
    }

    ul.appendChild(li);
    inptBox.value = "";

}

function newLiGen(li, id, value) {

    li.setAttribute("id", id);
    li.innerHTML = value;
    li.ondblclick = DbClickItem; 
    var span = document.createElement("span");
    span.classList.add("DownMenuBnt");
    span.onclick = showDownMenu;
    span.innerHTML = "...";
    li.appendChild(span);
}

function showDownMenu() {
    event.cancelBubble = true;
    hideDownMenu();
    var span=event.target;
    var li = span.parentElement;
    var ul = li.parentElement;
/*    if(ul.id == "proList"){
        ChangeSelPro(li.id);
    }
    else if(ul.id == "todoList" || ul.id == "proDetails"){
        HighlightStep(li.id);
    }
    else{}
*/
    li.onclick();

    var div=ul.parentElement;
    var downDiv = div.getElementsByClassName("downMenuContainer").item(0);
    /*alert(downDiv.id); */
    if( downDiv.style.display == "none") {
        downDiv.style.top = this.offsetTop + 20 + 'px';
        downDiv.style.left = this.offsetLeft;
        downDiv.style.display = "block";
    }
    else if( downDiv.style.display == "block" ) {
        downDiv.style.display = "none";
    }
        
}

function docOnclick() {

    hideDownMenu();
    event.cancelBubble = false;
}

function hideDownMenu() {
    downDivs = document.getElementsByClassName("downMenuContainer");
    for(var ind = 0; ind<downDivs.length; ind++){
        downDivs[ind].style.display = "none";
    }
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

    updateUlList(ul, itemLi.id, newValue);
   /* itemLi.innerHTML = newValue; */

}

document.onkeypress = function(e) {
    var ev= (typeof event != 'undefined' )? window.event : e;
   /* alert(document.activeElement.classList); */
    if(ev.keyCode == 13 && document.activeElement.id == "inputBox"){
        document.activeElement.blur();
    }
    else if(ev.keyCode == 13 && document.activeElement.classList.contains("newItemInpt") ) {
        newItem(document.activeElement);
    }
}

function DbClickItem() {
    
   /* alert("DbClickItem"); */
   /* var span=this.getElementsByTagName("span").item(0);
    this.removeChild(span);
    inpt.value = this.innerHTML;
    this.removeChild(this.firstChild);
    this.appendChild(inpt);
    inpt.focus();
   */
    insertInptToItem(this);
}

function insertInptToItem(li) {
    var span=li.getElementsByTagName("span").item(0);
    li.removeChild(span);
    inpt.value = li.innerHTML;
    li.removeChild(li.firstChild);
    li.appendChild(inpt);
    inpt.focus();

}

function updateUlList( ul, id, newValue ) {
    for(var ind = 0; ind<ul.children.length; ind++){
        if(ul.children[ind].id == id){
            /*alert(id); */
            var li=document.createElement("li");
            newLiGen(li, id, newValue);
            if( ul.id == "proList" )
                li.onclick = ClickProItem;
            else if( ul.id == "inputList" )
                li.onclick = ClickInptItem;
            else if( ul.id == "todoList" || ul.id == "proDetails" )
                li.onclick = ClickStepItem;
            else{}
            /*li.onclick = ul.id == "proList"? ClickProItem : ClickStepItem; */
            ul.removeChild(ul.children[ind]);
            ul.insertBefore(li, ul.children[ind]);
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

function updateStepState(id, newState) {
    /*alert(newState);*/
    for(var ind=0; ind<stepList.length; ind++){
        if(stepList[ind].id == id) {
            /*alert(stepList[ind].id);*/
            stepList[ind].state = newState;
            return true;
            break;
        }
    }
    return false;
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

function addStep(id, newValue, proId, state) {
    var newStep = {};
    newStep.id = id;
    newStep.value = newValue;
    newStep.proId = proId;
    newStep.state = state;
    stepList.push(newStep);

    return true;
}

function addPro(id, newValue) {
    var newPro = {};
    newPro.id = id;
    newPro.value = newValue;
    proList.push(newPro);
    return true;

}

function addInput( id, newValue) {
    var newInput = {};
    newInput.id = id;
    newInput.value = newValue;
    inputList.push(newInput);
    /*alert(inputList[inputList.length-1].id); */
}

function rmInpt(id) {
    for(var ind =0; ind<inputList.length; ind++){
        if(inputList[ind].id = id){
            inputList.splice(ind,1);
            return true;
        }
    }
    return false;
}

function rmStep(id) {
    for(var ind =0; ind<stepList.length; ind++){
        if(stepList[ind].id == id){
            stepList.splice(ind,1);
            return true;
        }
    }
    return false;
}

function rmProById(proId) {
    if( !rmStepByProid(proId) ){
        alert("fail to remove project steps");
        return false;
    }

    for(var ind=0; ind<proList.length; ind++) {
        if(proList[ind].id = proId){
            proList.splice(ind,1);
            return true;
        }
    }

    return false;

}
function rmStepByProid(proId){
    for(var ind=stepList.length-1; ind>=0; ind--){
        if(stepList[ind].proId == proId){
            stepList.splice(ind,1);
        }
    }
    return true;
}
         
function findStepsByProid(proId){
    var stepsByProid = new Array();

    for(var ind=0; ind<stepList.length; ind++){
        if(stepList[ind].proId == proId){
            stepsByProid.push(stepList[ind]);
        }
    }

    return stepsByProid;
}
