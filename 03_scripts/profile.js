//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import {  } from '../mainUser.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log('profile.js loaded')
    console.log('DOM Loaded');      //Check if DOM is loaded
});  //End of DOM loader


var profileUsername;

async function getUsername(userId) {
    const { data, error } = await supa
        .from('users')
        .select('username')
        .eq('id', userId);   //Get username where db id = userId
    if (error) {
        console.error('Could not retrieve username from database');  //Add error handling
    }
    else {
        profileUsername = data[0].username; //Assign username to profileUsername
        $('#profile_username').innerHTML = profileUsername; //Replace default username with actual username
    }
    console.log('console.log in function ' + profileUsername);
}
(async () => {
    await getUsername(userId);
    console.log('Async test: ' + profileUsername);
})();

//Trigger getUsername on pageload
document.addEventListener('DOMContentLoaded', () => {
    getUsername();
});