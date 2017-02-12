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
         var i = 0;
         var loopArray = function (data) {
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
            fillCell4(data[i], cell4, function () {
               i++;
               if (i < data.length) {
                  loopArray(data);
               }
            });
         }
         loopArray(data);
      }
   });
}

function fillCell4(candidateData, cell4, callback) {
   firebase.storage().ref(candidateData.resumeTimestamp).getDownloadURL().then(function (url) {
      while (cell4.innerHTML == "") {
         cell4.innerHTML = "<td><a href=" + url + " class='btn'>Download Resume</a></td>";
      }
   });
   callback();
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
   
   var uploadTask = storageRef.put(file_data);
   
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
   cell4.innerHTML = "<td><b class='disabledBtn'>Uploading...</b></td>";
   
   // Listen for state changes, errors, and completion of the upload.
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
         case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
         case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
      }
   }, function (error) {
      switch (error.code) {
         case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

         case 'storage/canceled':
            // User canceled the upload
            break;

         case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
      }
   }, function () {
      cell4.innerHTML = "<td><a href=" + uploadTask.snapshot.downloadURL + " class='btn' >Download Resume</a ></td > ";
   });
   
   document.getElementById('submit').scrollIntoView();
   
   $('html, body').animate({
      scrollTop: $("#candidates").offset().top
   }, 1500, 'easeInOutExpo');

   return false;
}