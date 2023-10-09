console.log('Script.js loaded')

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');      //Prevent loading script before DOM is loaded
})

//import supabase
import { supa } from '../00_setup/supabase.js';

//general------------------------------------------------------------------------

var userId; //userID of logged-in user for further use

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

//login--------------------------------------------------------------------------

//register-----------------------------------------------------------------------

//profile-------------------------------------------------------------------------
//Get username of logged-in user
var profileUsername;

async function getUsername(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)   //Get username where db id = userId 

        profileUsername = data[0].username; //Assign username to profileUsername
}

console.log('username: ' + getUsername(userId));
$('#profile_Username').innerHTML = profileUsername; //Replace default username with actual username

//Get questpoints from database
let questPoints;


//editProfile---------------------------------------------------------------------