//import supabase
import { supa } from './00_setup/supabase.js';
//console.log(supa)

const userId = await supa.auth.user(); //userId of logged-in user for further use
console.log('userId:', userId);

//Load avatar----------------------------------------------------------------------------
async function loadAvatar() {
    try {
        const avatarPlaceholder = document.querySelector('.avatar');
        //Fetch the avatar URL
        const imageUrl = await supa
            .from('users')
            .select('avatar_url')
            .eq('id', userId.id)
            .single();
        //Update avatar placeholder
        if (imageUrl) {
            //console.log('imageUrl:', imageUrl.data.avatar_url);
            avatarPlaceholder.src = imageUrl.data.avatar_url;

            // Set CSS properties to fit the image with correct aspect ratio
            avatarPlaceholder.style.objectFit = 'cover';
        } else {
            console.error('Error fetching avatar URL:', error.message);
        }
    } catch (error) {
        console.error('Error fetching avatar URL:', error.message);
    }
}

//Error handling for placeholder
const avatarPlaceholder = document.querySelector('.avatar');
if (avatarPlaceholder !== null) { document.addEventListener('DOMContentLoaded', loadAvatar); }


//Exports
export { userId };
export { loadAvatar };