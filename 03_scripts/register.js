//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
});

//Signup user--------------------------------------------------------------------------------------------
async function registerUser() {
    const registerEmail = document.querySelector('#registerEmail').value;
    const registerPassword = document.querySelector('#registerPassword').value;

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
        { id: user.id, username: registerUsername, questScore: 0 }
    ]);
    //Testing
    //console.log(data);

    //If user registration successful, redirect to index
    if (data) {
        window.location.href = "../index.html";
    }
}


//Upload profile picture---------------------------------------------------------------------------------
const avatarUpload = document.getElementById('profile_pictureUpload');
 
avatarUpload.addEventListener('change', async (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
        // Generate a unique filename for the uploaded image
        const filename = `image_profile/${Date.now()}_${imageFile.name}`;

        // Upload the image to the Supabase bucket
        const { data, error } = await supa.storage
            .from('image_bucket')
            .upload(filename, imageFile);

        if (error) {
            console.error('Error uploading image:', error.message);
        } else {
            // Get the URL of the uploaded image
            const avatarUrl = supa.storage
                .from('image_bucket')
                .getPublicUrl(filename);

            // Get User_ID
            const initialUser = supa.auth.user();

            // Insert the URL and User_ID into the 'users' table
            const { data: insertedData, error: insertError } = await supa
              .from('users')
              .update({ avatar_url: avatarUrl.publicURL })
              .eq('id', initialUser.id);
              
            //Error handling
            if (insertError) {
                console.error('Error inserting image URL:', insertError.message);
            } else {
                console.log('Image URL inserted successfully:', avatarUrl);
            }
        }
    }
});


// RegisterUser button event listener
document.querySelector('#registerButton').addEventListener('click', registerUser);