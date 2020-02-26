//book constructor
function Details (name, track, mobile) {
    this.name = name;
    this.track = track;
    this.mobile = mobile;
}


//ui constructor
function UI() {
    
}

UI.prototype.addDetailsToList = function (details) {
    const list = document.getElementById("details-list")
    
    //create tr element
    const row = document.createElement("tr");
//insert cols
    row.innerHTML=`<td>${details.name}</td>
                    <td>${details.track}</td>
                    <td>${details.mobile}</td>
                    <td><a href="#" class="delete"> X </a></td>`;

    list.appendChild(row);
}


//Function for Submitting details
function submitDetails(e) {
    //getting form values
    const name = document.getElementById("name").value, //I used the comma here so I don't have to keep on writing const
     track = document.getElementById("track").value,
     mobile = document.getElementById("mobile").value
    

     //instantiating the details
    const details = new Details(name, track, mobile);
    

    //instantiating the ui
    const ui = new UI();
    
    //validate if empty
    if (name === " " || track === " " || mobile === "") {
        //error alert
        ui.showAlert("Please fill in all fields", "error")
    } else {


        //add details to list
        ui.addDetailsToList(details);

        //show sucess
        ui.showAlert("Book Added", "Success");

        //clearFields
        ui.clearFields();

        e.preventDefault();
    }

    
}

//show Alerts I need to create a div, then text node to hold the message i'll be appending
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent to append to in DOM
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#details-form")
    
    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000)

}
//Delete Details
UI.prototype.deleteDetails(target) {
    if(target.className === "delete"){
        target.parentElement.parentElement.remove();
    }
};

//clear fields aafter addiing details
UI.prototype.clearFields = function (){
    document.getElementById("name").value = "";
    document.getElementById("track").value = "";
    document.getElementById("mobile").value = "";
}



//Event Listeners
document.getElementById("details-form").addEventListener("submit", submitDetails);


// Function To Delete Student Details
clear = (e) => {
    //Instantiate the ui so the del can 
    const ui = new UI();

    // deleting the element
    ui.deleteDetails(e.target);

    //show message after delete
    ui.showAlert("Details Removed")
    e.preventDefault();
}
//Event Listner For Delete
document.getElementById("details-list").addEventListener("click", clear);


