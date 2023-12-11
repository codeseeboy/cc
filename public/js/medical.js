document.getElementById('certificateForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Capture input values (same as before)
  
    // Load the certificate template
    fetch('/certificate')
      .then(response => response.text())
      .then(template => {
        // Replace placeholders with actual data in the template
        const certificateContent = template
          .replace('${patientName}', patientName)
          .replace('${doctorName}', doctorName)
          .replace('${patientDOB}', patientDOB)
          .replace('${patientContactNumber}', patientContactNumber)
          .replace('${doctorLicenseNumber}', doctorLicenseNumber)
          .replace('${clinicName}', clinicName)
          .replace('${clinicContactInfo}', clinicContactInfo)
          .replace('${examinationDate}', examinationDate)
          .replace('${medicalCondition}', medicalCondition)
          .replace('${startDate}', startDate)
          .replace('${endDate}', endDate)
          .replace('${restrictions}', restrictions)
          .replace('${medication1}', medication1)
          .replace('${dosage1}', dosage1)
          .replace('${frequency1}', frequency1)
          .replace('${medication2}', medication2)
          .replace('${dosage2}', dosage2)
          .replace('${frequency2}', frequency2)
          .replace('${followUpDate}', followUpDate);
  
        // Open a new window for printing
        const newWindow = window.open('', '', 'width=600,height=600');
        newWindow.document.open();
        newWindow.document.write('<html><head><title>Print Certificate</title><link rel="stylesheet" type="text/css" href="css/medical.css"></head><body>');
        newWindow.document.write(certificateContent);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
  
        // Print the certificate
        newWindow.print();
        newWindow.close();
      });
  });
  