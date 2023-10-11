//Import supabase
import { supa } from '../00_setup/supabase.js';
console.log('imported supabase');

function registerUser() {
    let registerEmail = $('#registerEmail');
    let registerUsername = $('#registerEmail');
    let registerPassword = $('#registerPassword');

    const { data, error } = supabase.auth.signUp({
        email: registerEmail.value,
        password: registerPassword.value
    },
        {//Register additional username data
            data: {
                username: registerUsername.value
            }
        }
    );
    console.log('User registered successfully');
};
