document.addEventListener('DOMContentLoaded', function() {
    fetch('http://192.168.1.8:3000/api/users/nurses')
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('#tablaEnfermeros tbody');

            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

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
                viewButton.textContent = 'Ver';
                viewButton.classList.add('btn', 'btn-default', 'btn-xs');
                actionCell.appendChild(viewButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.classList.add('btn', 'btn-danger', 'btn-xs');
                deleteButton.addEventListener('click', () => {
                // Mostrar mensaje de confirmación
                const isConfirmed = confirm(`¿Estás seguro de que deseas eliminar el registro con ID ${nurse.id}?`);
                if (isConfirmed) {
                    // El usuario confirmó la eliminación
                    fetch(`/api/users/${nurse.id}`, { method: 'DELETE' })
                    .then(response => response.json()) // Asumiendo que el servidor responde con JSON
                    .then(data => {
                        if (data.success) { // Asumiendo que el servidor responde con un campo 'success'
                            console.log(`Registro con ID ${nurse.id} eliminado`);
                            alert(`Registro con ID ${nurse.id} eliminado correctamente.`);
                            // Aquí puedes eliminar la fila de la tabla o recargar la tabla/partes de la página para reflejar la eliminación
                        } else {
                            console.error('Error al eliminar el registro:', data.message); // Asumiendo que el servidor responde con un campo 'message'
                            alert('Hubo un error al intentar eliminar el registro: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Hubo un error al intentar eliminar el registro.');
                    });
                }
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
        .catch(error => console.error('Error:', error))
        .finally(() => {
            // Inicializa DataTable aquí, después de que todos los datos se hayan procesado
            $('#tablaEnfermeros').DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
                },
                pageLength: 10 
            });
        });
});