
function displayForm(formID) {

  document.getElementById(formID).style.display = "flex";

  document.getElementById(formID).scrollIntoView({behavior: 'smooth', block: 'center'});
}

function  submitForm() {
  
  selectSpecialist();

  document.getElementById("outputDisplay").style.display = "block";

  document.getElementById("outputDisplay").scrollIntoView({behavior: 'smooth', block: 'center'});

}


function getAllSpecialists() {
  fetch('http://localhost:8080/all')
  .then(response => {
    if (!response.ok) {
      return response.status;
    } else {
      return response.json();
    }
  })
  .then (response => {
    var num = response.length;

    for(var i = 0; i < num; i ++) {
      var specialist = response[i];
      document.getElementById("allSpecialists").innerHTML += (
        "<p>" + specialist.id + " " + specialist.first_name + " " + specialist.last_name + "</p>"
      );
    }
  })
  .catch(error => {
    console.error('There was an error', error);
  })
}

// getAllSpecialists();

function selectSpecialist() {
  // Get the selected values from the form
  var supportArea = document.querySelector('input[name="supportArea"]:checked').value;
  var region = document.querySelector('#region').value;

  if((supportArea != "") && (region != "" )) {

  
  var hubAddress;
  var hubPhoneNumber;
  var specialistName;

  fetch('http://localhost:8080/test/' + supportArea + '/' + region)
  .then(response => {
    if (!response.ok) {
      return response.status;
    } else {
      return response.json();
    }
  })
  .then(response => {
    if (typeof response === 'object') {
      // Check if the response is a valid JSON object
      console.log(response); // Print the response to the console
      
      document.getElementById('specialistName').innerHTML = response.specialistDTO.first_name + ' '  + response.specialistDTO.last_name;
      document.getElementById('specialistCallBack').innerHTML = response.specialistDTO.first_name;

      document.getElementById('hubAddress').innerHTML = response.hubDTO.address;
      document.getElementById('hubPhoneNumber').innerHTML = '0' + response.hubDTO.phone_number;
    } else {
      console.error('Invalid JSON response:', response);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

} else {
  window.alert('Test');
    document.getElementById('invalidInput').style.display = 'flex';
}


}

