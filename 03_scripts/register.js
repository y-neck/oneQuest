//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
})

function registerUser() {
    let registerEmail = $('#registerEmail').value;
    let registerUsername = $('#registerEmail').value;
    let registerPassword = $('#registerPassword').value;

    const { data, error } = supa.auth.signUp({registerEmail,registerPassword},
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