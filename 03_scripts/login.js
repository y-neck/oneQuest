//import supabase
import { supa } from '../00_setup/supabase.js';

//import userId
import { userId } from '../mainUser.js';

//Login user
async function loginUser() {
    const loginEmail = document.querySelector('#loginEmail').value;
    const loginPassword = document.querySelector('#loginPassword').value;

    //Testing
    //console.log(loginEmail,loginPassword)

    /*     const { data, error } = await supa.auth.signInWithPassword({
            username: loginEmail,
            password: loginPassword,
        }); */

    const { error } = await supa.auth.signIn({
        email: loginEmail,
        password: loginPassword,
    });
    
    if (error) {
        console.error('Error logging in:', error.message);  //Add error handling
    } else {
        //Testing
        //console.log('Logged in successfully as ', userId);
        
        //Redirect to index if login successful
        window.location.href = "../index.html";
    }
}

//Event listener for login button
document.querySelector('#loginButton').addEventListener('click', loginUser);
