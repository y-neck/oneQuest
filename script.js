//import supabase
import { supa } from './00_setup/supabase.js';

console.log('Script.js loaded')

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');      //Check if DOM is loaded


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

checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        setTimeout(function () {
            checkbox.style.display = 'none';
            uploadForm.style.display = 'flex';
        }, 400);
    } else {
        setTimeout(function () {
            checkbox.style.display = 'flex';
            uploadForm.style.display = 'none';
        }, 400);
    }
});


//upload image-----------------------------------------------------------------------
const imageFileInput = document.getElementById('image_File');

imageFileInput.addEventListener('change', async (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
        // Generate a unique filename for the uploaded image
        const filename = `image_posts/${Date.now()}_${imageFile.name}`;

        // Upload the image to the Supabase bucket
        const { data, error } = await supa.storage
              .from('image_bucket')
              .upload(filename, imageFile);

        if (error) {
            console.error('Error uploading image:', error.message);
        } else {
              // Get the URL of the uploaded image
        const imageUrl = supa.storage
            .from('image_bucket')
            .getPublicUrl(filename);
            
        // Insert the URL into the 'images' table
        const { data: insertedData, error: insertError } = await supa
            .from('images')
            .insert([{ url: imageUrl.publicURL }]);
            
        if (insertError) {
            console.error('Error inserting image URL:', insertError.message);
        } else {
            console.log('Image URL inserted successfully:', imageUrl);
        }
    }
    }
});


// loading posts
const imageContainer = document.querySelector('.quest_Images');
// Fetch the image URLs from the 'images' table
const { data: imageData, error: imageError } = await supa   //@joggiletti await requires to be part of an async function
  .from('images')
  .select('url');

if (imageError) {
  console.error('Error fetching image URLs:', imageError.message);
} else {
    // Iterate through the image data and update the image elements
    for (let i = 0; i < 9; i++) {
    const img = imageContainer.children[i];
    // Check if there is an image URL available for this index
        if (i < imageData.length) {
            img.src = imageData[i].url;
        } else {
    // If there is no image URL available, you can set a fallback image or hide the image element
            img.style.display = 'none';
    }
  }
};


//login--------------------------------------------------------------------------

//register-----------------------------------------------------------------------

//profile-------------------------------------------------------------------------
var profileUsername;

function getUsername(userId){

}


//editProfile---------------------------------------------------------------------

});  //End of DOM loader
