 const recordForm = document.getElementById("record-form");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const emailInput = document.getElementById("email");
    const recordList = document.getElementById("record-list");
    const editIndexInput = document.getElementById("edit-index");
    const toast = document.getElementById("toast");

    let records = JSON.parse(localStorage.getItem('records')) || [];

    function isDuplicateName(email) {
      return records.some(
        (record) => record.email.toLowerCase() === email.toLowerCase()
      );
    }

    function displayRecords() {
      recordList.innerHTML = '';
      if (records.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" style="text-align:center;color:red;">No records found</td>';
        recordList.appendChild(row);
      } else {
        records.forEach((record, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.age}</td>
            <td>${record.email}</td>
            <td><button onclick="editRecord(${index})">Edit</button></td>
            <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
          `;
          recordList.appendChild(row);
        });
      }
    }

    function showToast(message) {
      toast.innerText = message;
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 3000);
    }

    recordForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = nameInput.value;
      const age = ageInput.value;
      const email = emailInput.value;
      const editIndex = parseInt(editIndexInput.value);

      if (name && age && email) {
        if (isDuplicateName(email) && editIndex === -1) {
          alert('Student already exists.');
          return;
        }
        if (editIndex === -1) {
          records.push({ name, age, email });
          showToast('Record added successfully!');
        } else {
          records[editIndex] = { name, age, email };
          editIndexInput.value = -1;
          showToast('Record updated successfully!');
        }
        localStorage.setItem('records', JSON.stringify(records));
        nameInput.value = '';
        ageInput.value = '';
        emailInput.value = '';
        displayRecords();
      }
    });

    function editRecord(index) {
      const recordToEdit = records[index];
      nameInput.value = recordToEdit.name;
      ageInput.value = recordToEdit.age;
      emailInput.value = recordToEdit.email;
      editIndexInput.value = index;
    }

    function deleteRecord(index) {
      records.splice(index, 1);
      localStorage.setItem('records', JSON.stringify(records));
      displayRecords();
    }

    displayRecords();