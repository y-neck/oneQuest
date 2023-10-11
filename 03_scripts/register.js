//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
})

function registerUser() {
    let registerEmail = $('#registerEmail');
    let registerUsername = $('#registerEmail');
    let registerPassword = $('#registerPassword');

    const { data, error } = supa.auth.signUp({
        email: registerEmail.value,
        password: registerPassword.value
    },
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
        console.log('User registered successfully');
    }
};