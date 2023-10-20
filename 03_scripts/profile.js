//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import { userId } from '../mainUser.js';
console.log('Imported mainUser.js');

//Serve login if user is not logged in
if (userId === null) {
    window.location.href = '../views/login.html';
}

//TODO: @y-neck Get user's profile picture
async function getProfilePicture(userId){
    const {data, error}=await supa
    .from('users')
    .select('avatar_url')
    .eq('id',userId.id)
    .single();

    if(error){
        console.error('Could not retrieve profile picture from user: ',error.message)
    } else {
        document.querySelector('#profile_picture_url').src = userId.avatar_url;
    }
}

//Replace default username with username from database
async function getUsername(userId) {
    const { data, error } = await supa
        .from('users')
        .select('username')
        .eq('id', userId.id)   //Get username where db id = userId
        .single();

    if (error) {
        console.error('Could not retrieve username from database: ', error.message);  //Add error handling
    } else {
        document.querySelector('#profile_username').innerHTML = data.username; //Replace default username with actual username
        }
        //Testing
        //console.log('console.log in function ', data.username);
    }

    //Get questpoints from database
    async function getQuestpoints(userId) {
        const { data, error } = await supa
            .from('users')
            .select('questScore')
            .eq('id', userId.id)
            .single();

        if (data) {
            document.getElementById('profile_questpoints_number').innerHTML = data.questScore;
        } else {
            console.error('Could not retrieve questpoints from database:', error.message);
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
        getQuestpoints();

    });  //End of DOM loader