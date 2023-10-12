//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
})

async function registerUser() {
    const registerEmail = document.querySelector('#registerEmail').value;
    const registerUsername = document.querySelector('#registerEmail').value;
    const registerPassword = document.querySelector('#registerPassword').value;

    const { data, error } = await supa.auth.signUp({registerEmail,registerPassword},
        {//Register additional username data
            data: {
                username: registerUsername.value
            }
        }
    );
    if (error) {
        console.error('Error registering user:', error.message);    //Add error handling
    }
    else {
        console.log(data);
        console.log('User registered successfully as' + data[0].registerUsername);
    }
}

// RegisterUser button event listener
document.querySelector('#registerButton').addEventListener('click', registerUser);