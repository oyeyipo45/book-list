//book constructor
function Book (name, track, mobile) {
    this.name = name;
    this.track = track;
    this.mobiile = mobile;
}


//ui constructor
function UI() {
    
}


//Function for Submitting details
detailSubmit = () => console.log("okay")

//Event Listeners
document.getElementById("detail-form").addEventListener("submit", detailSubmit)
