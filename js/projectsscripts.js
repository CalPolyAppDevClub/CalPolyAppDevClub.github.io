document.addEventListener('DOMContentLoaded', loadList, false);

function loadList() {
   var i;
   for (i = 0; i < 5; i++) {
      var table = document.getElementById("candidateList");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = "Your Name";
      cell2.innerHTML = "Your Major";
      cell3.innerHTML = "Your Year";
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

   window.location.hash = '#submit';
   
   $('html, body').animate({
      scrollTop: $("#candidates").offset().top
   }, 1500, 'easeInOutExpo');

   return false;
}