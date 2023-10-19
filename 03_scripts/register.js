//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
})

async function registerUser() {
    const registerEmail = document.querySelector('#registerEmail').value;
    const registerPassword = document.querySelector('#registerPassword').value;

    //Signup user
    const { user, error } = await supa.auth.signUp({
        email: registerEmail,
        password: registerPassword,
    });

    if (error) {
        console.error('Error registering user:', error.message);    //Add error handling
    } else {
        console.log('User registered successfully as ', user);
        updateUserName(user);
    }

}

// Function to update user status
function updateUserStatus(user) {
    if (user) {
        console.log(`Authenticated as`, user.email);
    } else {
        console.log('Not authenticated.');
    }
}

// Check and display the initial user status
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

//Update users table with username and email
async function updateUserName(user) {
    const registerUsername = document.querySelector('#registerUsername').value;
    //Update username
    const { data, error } = await supa.from('users').insert([
        {id: user.id, username: registerUsername}
    ])
    console.log(data);

    //If user registration successful, redirect to index
    if(data){
        window.location.href="../index.html";
    }
}

// RegisterUser button event listener
document.querySelector('#registerButton').addEventListener('click', registerUser);