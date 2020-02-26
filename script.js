//class to define the details
class Detail {
    constructor(name, track, mobile){
        this.name =  name;
        this.track =  track;
        this.mobile =  mobile;
    }
};

//class to define the UI functionality
class UI {
    addDetailsToList(detail){
        const list = document.getElementById("detail-list")
    
        //create the element
        const row = document.createElement("tr");
        //insert cols
        row.innerHTML=`<td>${detail.name}</td>
                        <td>${detail.track}</td>
                        <td>${detail.mobile}</td>
                        <td><a href="#" class="delete"> X </a></td>`;

        list.appendChild(row);

    }

    showAlert(message, className){
        
    //create div
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent to append to in DOM
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#detail-form")
    
    //insert alert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
        document.querySelector(".alert").remove();
    }, 3000);

    }

    deleteDetail(target){
        if(target.className === "delete"){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById("name").value = "";
        document.getElementById("track").value = "";
        document.getElementById("mobile").value = "";
    }
}


//Local Storage Class

 class Storage {

    static getDetails(){
        let details;
        //checking if the details is in the local storage 
        if(localStorage.getItem("details") === null) {
            details = [];
        } else {
            //we need it to be an object so we have to parse it in json.parse
            details = JSON.parse(localStorage.getItem("details"));
        }

        return details;
    }

    static displayDetails(){

    }

    static addDetail(detail){ 
        //declaring details
       const details  =  Storage.getDetails();

        details.push(detail);

        localStorage.setItem("details", JSON.stringify(details)); 
    }

    static removeDetail(){

    }
 }



//Function for Submitting details
function submitDetails(e) {
    //getting form values
    const name = document.getElementById("name").value, //I used the comma here so I don't have to keep on writing const
     track = document.getElementById("track").value,
     mobile = document.getElementById("mobile").value
    

     //instantiating the details
    const detail = new Detail(name, track, mobile);
    

    //instantiating the ui
    const ui = new UI(); 
    
    console.log(ui)
    //validate if empty
    if (name === "" || track === "" || mobile === "") {
        //error alert
        ui.showAlert("Please fill in all fields", "error")
    } else {


        //add details to list
        ui.addDetailsToList(detail);

        //Add details to local storage
        Storage.addDetail(detail);

        //show success
        ui.showAlert("Details Added", "success");

        //clearFields
        ui.clearFields();

        
    }

    e.preventDefault();
}


//Event Listeners for add detail
document.getElementById("detail-form").addEventListener("submit", submitDetails);


// Function To Delete Student Details
clear = (e) => {
    //Instantiate the ui so the del can 
    const ui = new UI();

    // deleting the element
    ui.deleteDetail(e.target);

    //show message after delete
    ui.showAlert("Details Removed", "success");

    e.preventDefault();
}


//Event Listner For Delete
document.getElementById("detail-list").addEventListener("click", clear);

