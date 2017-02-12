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
            firebase.storage().ref(data[i].resumeTimestamp).getDownloadURL().then(function (url) {
               cell4.innerHTML = "<td><a href=" + url + " class='btn'>Download Resume</a></td>";
            });
         }
      }
   });
}

function writeCandidateData(name, major, year, timestamp) {
   firebase.database().ref('candidates/' + count).set({
      name: name,
      year: year,
      major: major,
      resumeTimestamp: timestamp
   });
}

function onSubmitCandidateForm() {
   var date = new Date();
   var timestamp = Number(date);
   var storageRef = firebase.storage().ref(timestamp.toString());
   var $ = jQuery;
   var file_data = $('#uploadResume').prop('files')[0];

   storageRef.put(file_data);
   
   writeCandidateData(document.getElementById("name").value, document.getElementById("major").value,
      document.getElementById("year").value, timestamp.toString());
   
   var table = document.getElementById("candidateList");
   var row = table.insertRow(0);
   var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3);
   cell1.id = "candidateListItem";
   cell2.id = "candidateListItem";
   cell3.id = "candidateListItem";
   cell4.id = "candidateListItem";
   cell1.innerHTML = document.getElementById("name").value;
   cell2.innerHTML = document.getElementById("major").value;
   cell3.innerHTML = document.getElementById("year").value;
   cell4.innerHTML = "<td><a href='javascript:window.location.href=window.location.href' class='btn'>Refresh for Link</a></td>";

   document.getElementById('submit').scrollIntoView();
   
   $('html, body').animate({
      scrollTop: $("#candidates").offset().top
   }, 1500, 'easeInOutExpo');

   return false;
}