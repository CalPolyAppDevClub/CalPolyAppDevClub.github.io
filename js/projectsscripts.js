document.addEventListener('DOMContentLoaded', loadList, false);

$.loadList = function () {
   $.getJSON("https://polyappdev-projects.firebaseio.com/candidates.json", function (data) {
      populate(data);
   });
};

function populate(data) {
   var table = document.getElementById("candidateList");
   var row = table.insertRow(0);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3);
   cell1.innerHTML = "your name";
   cell2.innerHTML = "your year";
   cell3.innerHTML = "your major";
   cell4.innerHTML = "<td><a href='#' class='btn'>Download Resume</a></td>";
   var i;
   for (i = 0; i < data.length; i++) {
      
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = data[i].getElementById("name");
      cell2.innerHTML = data[i].getElementById("year");
      cell3.innerHTML = data[i].getElementById("major");
      cell4.innerHTML = "<td><a href='#' class='btn'>Download Resume</a></td>";
   }
}

function writeCandidateData(candidateID, name, year, major) {
   firebase.database().ref('candidates/' + candidateID).set({
      name: name,
      year: year,
      major: major
   });
}

function onSubmitCandidateForm() {
   writeCandidateData(1, document.getElementById("name").value, document.getElementById("year").value, document.getElementById("major").value);
   
   loadList();

   document.getElementById('submit').scrollIntoView();
   
   $('html, body').animate({
      scrollTop: $("#candidates").offset().top
   }, 1500, 'easeInOutExpo');

   return false;
}
