

function add(){
    var input = document.getElementById("input").value;
    var list = document.getElementById("list");

    var item = document.createElement("p");
    item.innerHTML = input;

    list.appendChild(item);
    

}