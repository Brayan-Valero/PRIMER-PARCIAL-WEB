document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const codigo = document.getElementById('codigo').value;
    const clave = document.getElementById('password').value;  

    // Realizar la solicitud POST
    fetch('https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo: codigo, clave: clave }) 
    })
    .then(response => {
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostramos un error
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
        return response.json();  // Parseamos la respuesta JSON
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);  // Muestra los detalles de la respuesta

        // Verificar si la respuesta contiene los datos esperados
        if (data.codigo && data.nombre && data.email) {
            // Si la respuesta tiene los datos del usuario, los guardamos en localStorage
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'notas.html';  // Redirigimos a la página de notas
        } else {
            throw new Error('Credenciales no válidas');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        document.getElementById('errorMessage').textContent = `Error: ${error.message}`;
    });
});


