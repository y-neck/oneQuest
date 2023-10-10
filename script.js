console.log('Script.js loaded')

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');      //Prevent loading script before DOM is loaded
})

//import supabase
import { supa } from './00_setup/supabase.js';

//general------------------------------------------------------------------------

var userId = 1; //userID of logged-in user for further use

/* DEMO CODE
TODO: @y-neck should be implemented correctly
if(!userLoggedIn){
    console.log('User could not be retrieved')
} else{
    userId = 'ID of logged-in user'
}
*/

//index--------------------------------------------------------------------------
//TODO: @joggiletti if user is not logged in, serve login site instead


//Checkbox animation------------------------------------------------------------
const checkbox = document.getElementById('quest_checkbox');
const uploadForm = document.getElementById('image_Upload');

checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        setTimeout(function() {
            checkbox.style.display = 'none';
            uploadForm.style.display = 'flex';
        }, 400);
    } else {
        setTimeout(function() {
            checkbox.style.display = 'flex';
            uploadForm.style.display = 'none';
        }, 400);
    }
});



const imageFileInput = document.getElementById('image_File');

imageFileInput.addEventListener('change', async (e) => {
  const imageFile = e.target.files[0];

  if (imageFile) {
    // Generate a unique filename for the uploaded image
    const filename = `${Date.now()}_${imageFile.name}`;

    // Upload the image to the Supabase bucket
    const { data, error } = await supabase.storage
      .from('image_bucket')
      .upload(filename, imageFile);

    if (error) {
      console.error('Error uploading image:', error.message);
    } else {
      console.log('Image uploaded successfully:', data.Key);
    }
  }
});

//posts-----------------------------------------------------------------------

// 1. Retrieve the image URLs from the database
const imageUrls = [
  "url1",
  "url2",
  "url3",
  // ... more URLs
];

// 2. Select the HTML elements to replace
const imgElements = document.querySelectorAll("div.quest_Images img");

// 3. Replace the images with the URLs from the database
imgElements.forEach((imgElement, index) => {
  imgElement.src = imageUrls[index];
});
//login--------------------------------------------------------------------------

//register-----------------------------------------------------------------------

//profile-------------------------------------------------------------------------
var profileUsername;

async function getUsername(userId) {
    const { data, error } = await supa
        .from('users')
        .select('username')
        .eq('id', userId)   //Get username where db id = userId 

    if (error) {
        console.error('Could not retrieve username from database')  //Add error handling
    }
    else {
        profileUsername = data[0].username; //Assign username to profileUsername
        $('#profile_Username').innerHTML = profileUsername; //Replace default username with actual username
    }
    console.log(profileUsername);
}
//Test
(async () => {
    await getUsername(userId);
    console.log(profileUsername);
})();

//Trigger getUsername on pageload
document.addEventListener('DOMContentLoaded', () => {
    getUsername();
})

//Get questpoints from database
let questPoints;


//editProfile---------------------------------------------------------------------
