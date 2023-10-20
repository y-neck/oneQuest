//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import { userId } from '../mainUser.js';
console.log('Imported mainUser.js');


//Replace default username with username from database
async function getUsername(userId) {
    const {data, error} = await supa
        .from('users')
        .select('username')
        .eq('id', userId.id)   //Get username where db id = userId
        .single();

/*     if (error) {
        console.error('Could not retrieve username from database: ',error.message);  //Add error handling
    } else { 
 */        document.querySelector('#profile_username').innerHTML = data.username; //Replace default username with actual username
    //}
    console.log('console.log in function ', data.username);
}

//Get questpoints from database
async function getQuestpoints(userId) {
    const { data, error } = await supa
        .from('users')
        .select('questScore')
        .eq('id', userId);

        if(data){
            document.getElementById('profile_questpoints_number').innerHTML = data[0].questScore;
        } else {
            console.error('Could not retrieve questpoints from database');
        }
}
//Call functions
(async () => {
    await getUsername(userId);
    await getQuestpoints(userId);
})();

document.addEventListener('DOMContentLoaded', function () {
    console.log('profile.js loaded')
    console.log('DOM Loaded');      //Check if DOM is loaded
    getUsername();

});  //End of DOM loader