//import supabase
import { supa } from './00_setup/supabase.js';
//console.log(supa)

const userId = await supa.auth.user(); //userId of logged-in user for further use
console.log('userId:', userId);

export { userId };