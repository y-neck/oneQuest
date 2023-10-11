//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import { userId } from '../mainUser.js';
console.log ('Imported mainUser.js');

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
    
    if(data){
        profileUsername = data[0].username; //Assign username to profileUsername
        document.getElementById('profile_username').innerHTML = profileUsername; //Replace default username with actual username

    } else{
        console.error('Could not retrieve username from database');  //Add error handling
    }
    console.log('console.log in function ' + profileUsername);
}
(async () => {
    await getUsername(userId);
})();