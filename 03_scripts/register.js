//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
})

async function registerUser() {
    const registerEmail = document.querySelector('#registerEmail').value;
    const registerUsername = document.querySelector('#registerUsername').value;
    const registerPassword = document.querySelector('#registerPassword').value;

    try {
        const { data, error } = await supa.auth.signUp({
            email: registerEmail,
            password: registerPassword,
            options: {
                //Register additional username data: https://github.com/orgs/supabase/discussions/3491
                data: {
                    username: registerUsername
                }
            }
        });

        if (error) {
            console.error('Error registering user:', error.message);    //Add error handling
        } else {
            console.log('User registered successfully as ', data[0].username);
            // You can use user and session data here for further actions.
        }
    } catch (error) {
        console.error('An error occurred during registration:', error.message);
    }
}


// RegisterUser button event listener
document.querySelector('#registerButton').addEventListener('click', registerUser);