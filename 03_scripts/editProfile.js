//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import { userId } from '../mainUser.js';
console.log('Imported mainUser.js');

//Serve login if user is not logged in
if (userId === null) {
    window.location.href = '../views/login.html';
}

//Update user profile
async function updateUser() {
    // get elements
    let updateUsername = document.querySelector('#editUsername').value;
    let updatePassword = document.querySelector('#editPassword').value;
    //Update password
    const passwordUpdateResult = await supa.auth.update({ password: updatePassword });
    const passwordUpdateError = passwordUpdateResult.error;

    if (passwordUpdateError) {
        console.error('Error updating password:', passwordUpdateError.message);
    } else {
        console.log('Password updated successfully');
    }

    //Update username
    const usernameUpdateResult = await supa
        .from('users')
        .update({ username: updateUsername })
        .eq('id', userId.id)
    const usernameUpdateError = usernameUpdateResult.error;

    if (usernameUpdateError) {
        console.error('Error updating username:', usernameUpdateError.message);
    } else {
        console.log('Username updated successfully');
    }

    window.location.href = '../views/profile.html';
}

async function deleteUser() {
    //Warning
    alert('Willst du deinen Account wirklich löschen?');
    //Delete user
    const { error } = await supa.rpc('delete_user');
    //Error handling
    if (error) {
        console.error('Error deleting user:', error.message);
    } else {
        console.log('User deleted successfully');
    }
    //Delete localStorage
    localStorage.clear();
    //Redirect
    window.location.href = '../views/register.html';
}

//Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#editProfile_confirmChanges').addEventListener('click', updateUser);
    document.querySelector('#deleteProfile').addEventListener('click', deleteUser);
});