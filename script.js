//general------------------------------------------------------------------------
console.log('Script.js loaded')

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded');      //Prevent loading script before DOM is loaded
})

//import supabase
import { supabase } from '../00_setup/supabase.js';

/* DEMO CODE
TODO: @y-neck should be implemented correctly
var userId;
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
async function getUsername(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', userId)   //Get username where db id = userId 
}


//Get questpoints from database
let questPoints;


//editProfile---------------------------------------------------------------------