const inputs = document.querySelectorAll("input"); 
const emailElement = document.querySelector("#email") 
const passwordElement = document.querySelector("#password") 
let form = document.querySelector("form"); 
const url = "https://api-pagos-drf.onrender.com/users/login/" 
const locationToken = 'pagos.auth' 
 
// Verificar si hay un token almacenado y redirigir si está logueado 
if (localStorage.getItem(locationToken)) { 
    console.log("LOGUEADO") 
    // Redirigir a la página de inicio si está logueado 
    window.location.replace("./index.html"); 
} 
 
form.addEventListener('submit', async function (event) { 
    event.preventDefault(); 
    const email = emailElement.value.trim(); 
    const password = passwordElement.value.trim(); 
 
    if (!email || !password) { 
        // Validar campos de entrada 
        Swal.fire({ 
            text: "Por favor ingrese correo electrónico y contraseña.", 
            icon: "warning", 
        }); 
        return; 
    } 
 
    const credentials = { 
        email: email, 
        password: password, 
    }; 
    getToken(credentials); 
}); 
 
async function getToken(body) { 
    try { 
        const response = await fetch(url, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify(body), 
        }); 
 
        if (!response.ok) { 
            // Manejar errores de red o servidor 
            throw new Error("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde."); 
        } 
 
        const data = await response.json(); 
        if (!data.tokens  !data.tokens.access  !data.tokens.refresh) { 
            // Manejar errores de credenciales inválidas 
            throw new Error("Credenciales incorrectas"); 
        } 
 
        const accessToken = data.tokens.access; 
        const refreshToken = data.tokens.refresh; 
 
        localStorage.setItem(locationToken, JSON.stringify({ 
            accessToken: accessToken, 
            email: data.email, 
            id: data.id, 
            is_admin: data.roles.is_admin 
        })); 
        // Redirigir a la página de inicio 
        window.location.replace("./index.html"); 
    } catch (error) { 
        // Mostrar errores al usuario 
        Swal.fire({ 
            text: error.message, 
            icon: "error", 
        }); 
    }; 
}; 
 
const preloader = document.querySelector("#preloader") 
if (preloader) { 
    window.addEventListener('load', () => { 
        preloader.remove() 
    }); 
}