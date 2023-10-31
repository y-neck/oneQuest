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
//Get avatar----------------------------------------------------------------------------
async function getProfilePicture() {
    
}


//Replace default username with username from database-----------------------------------
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

//Get questpoints from database------------------------------------------------------------------
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

//User image gallery-------------------------------------------------------------------------------
//Load user's image gallery
const profileGallery = document.querySelector('#profile_gallery');
// Fetch the image URLs from the 'images' table
const { data: imageData, error: imageError } = await supa
    .from('images')
    .select('url')
    .eq('user', userId.id)
    .order('created_at', { ascending: false });

if (imageError) {
    console.error('Error fetching image URLs:', imageError.message);
} else {
    // Iterate through the image data and update the image elements
    for (let i = 0; i < 9; i++) {
        const img = profileGallery.children[i];
        // Check if there is an image URL available for this index
        if (i < imageData.length) {
            img.src = imageData[i].url;
        } else {
            // If there is no image URL available, you can set a fallback image or hide the image element
            img.style.display = 'none';
        }
    }
};


document.addEventListener('DOMContentLoaded', function () {
    console.log('profile.js loaded')
    console.log('DOM Loaded');      //Check if DOM is loaded
    getUsername();
    getQuestpoints();

});  //End of DOM loader