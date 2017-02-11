var count = 0;

document.addEventListener('DOMContentLoaded', loadList, false);

function loadList() {
   listItem = document.getElementById("candidateListItem");
   while (listItem != null) {
      listItem.remove();
      listItem = document.getElementById("candidateListItem");
   }

   $.getJSON("https://polyappdev-projects.firebaseio.com/candidates.json", function (data) {
      if (data != null) {
         var table = document.getElementById("candidateList");
         count = data.length;
         var i;
         for (i = 0; i < data.length; i++) {
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.id = "candidateListItem";
            cell2.id = "candidateListItem";
            cell3.id = "candidateListItem";
            cell4.id = "candidateListItem";
            cell1.innerHTML = data[i].name;
            cell2.innerHTML = data[i].major;
            cell3.innerHTML = data[i].year;
            cell4.innerHTML = data[i].file;
            //cell4.innerHTML = "<td><a href='#' class='btn'>Download Resume</a></td>";
         }
      }
   });
}

function writeCandidateData(name, year, major) {
   firebase.database().ref('candidates/' + count).set({
      name: name,
      year: year,
      major: major
   });
}

function onSubmitCandidateForm() {
   writeCandidateData(document.getElementById("name").value, document.getElementById("year").value, document.getElementById("major").value);
   
   loadList();

   document.getElementById('submit').scrollIntoView();
   
   $('html, body').animate({
      scrollTop: $("#candidates").offset().top
   }, 1500, 'easeInOutExpo');

   return false;
}