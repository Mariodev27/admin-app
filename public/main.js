// Realizar la solicitud HTTP
fetch('http://192.168.1.8:3000/api/users/nurses')
    .then(response => response.json())  // Convertir la respuesta en JSON
    .then(data => {
        // Obtener la tabla del DOM
        const table = document.querySelector('.table tbody');

        // Borrar los datos existentes de la tabla
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        // Añadir los nuevos datos a la tabla
        data.forEach(nurse => {
            const row = document.createElement('tr');
            
            const idCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const dniCell = document.createElement('td');
            const nameCell = document.createElement('td');
            const lastname1Cell = document.createElement('td');
            const lastname2Cell = document.createElement('td');
            const phoneCell = document.createElement('td');
            const locationCell = document.createElement('td');
            const ageCell = document.createElement('td');
            const priceCell = document.createElement('td');
            const experienceCell = document.createElement('td');
            const actionCell = document.createElement('td');

            idCell.textContent = nurse.id;
            emailCell.textContent = nurse.email;
            dniCell.textContent = nurse.dni;
            nameCell.textContent = nurse.name;
            lastname1Cell.textContent = nurse.lastname1;
            lastname2Cell.textContent = nurse.lastname2;
            phoneCell.textContent = nurse.phone;
            locationCell.textContent = nurse.location;
            ageCell.textContent = nurse.age;
            priceCell.textContent = nurse.price;
            experienceCell.textContent = nurse.experience;

            const viewButton = document.createElement('a');
            viewButton.href = '#';
            viewButton.textContent = 'View';
            viewButton.classList.add('btn', 'btn-default', 'btn-xs');
            actionCell.appendChild(viewButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-xs');
            deleteButton.addEventListener('click', () => {
                // Aquí va el código para eliminar el registro
                // Por ejemplo, podrías hacer una solicitud HTTP DELETE a tu API
                console.log(`Deleting record with ID ${nurse.id}`);
            });
            actionCell.appendChild(deleteButton);

            row.appendChild(idCell);
            row.appendChild(emailCell);
            row.appendChild(dniCell);
            row.appendChild(nameCell);
            row.appendChild(lastname1Cell);
            row.appendChild(lastname2Cell);
            row.appendChild(phoneCell);
            row.appendChild(locationCell);
            row.appendChild(ageCell);
            row.appendChild(priceCell);
            row.appendChild(experienceCell);
            row.appendChild(actionCell);

            table.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));