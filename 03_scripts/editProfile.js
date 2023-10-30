//import supabase
import { supa } from '../00_setup/supabase.js';

//Import mainUser.js functions
import { userId } from '../mainUser.js';
console.log('Imported mainUser.js');

//Serve login if user is not logged in
if (userId === null) {
    window.location.href = '../views/login.html';
}

