
function myFunction(id) {
  document.getElementById(id).classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.menu-action')) {
    var dropdowns = document.getElementsByClassName("menu-btn-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function newProjectModal(){
  $('.new-project-modal').modal('show');
}

function newProjectModalClose(){
  $('.new-project-modal').modal('hide');
}



function newTaskModal(){
  $('.new-task-modal').modal('show');
}

function editTaskModal(){
  $('.edit-task-modal').modal('show');
}
