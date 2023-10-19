// Import supabase
import { supa } from '../00_setup/supabase.js';

//Import userId
import { userId } from '../mainUser.js';

// If user is not logged in, serve login site instead
const initialUser = supa.auth.user();   //@joggiletti Replace with userId from line 5

if (initialUser === null) {
    window.location.href = '../views/login.html';
}


/* 
// Checkbox to image: upload animation------------------------------------------------------------
const checkbox = document.getElementById('quest_checkbox');
const uploadForm = document.getElementById('image_Upload');

// Show Upload Button instead of Checkbox when it's checked
checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        setTimeout(function () {
            checkbox.style.display = 'none';    //Switch display state for elements after timeout
            uploadForm.style.display = 'flex';
        }, 400);
    } else {
        setTimeout(function () {
            checkbox.style.display = 'flex';
            uploadForm.style.display = 'none';
        }, 400);
    }
});
 */


// Update questScore
async function updateQuestScore() {
    const { data: questScoreData, error: questScoreError } = await supa
        .from('users')
        .select('questScore')
        .eq('id', userId.id)
        .single();  //Get single column

    if (questScoreError) {
        console.error('Error fetching questScore:', questScoreError.message);
        return;
    }

    let questScore = questScoreData.questScore;

    // Handle 'null' value by setting it to 0
    if (questScore === null) {
        questScore = 0;
    }

    // Update the questScore
    const { data, error } = await supa
        .from('users')
        .update({ questScore: questScore + 1 })
        .eq('id', userId.id)
        .single();

    if (error) {
        console.error('Error updating questScore:', error.message);
    } else {
        console.log('QuestScore updated successfully. New questScore:', data.questScore);
    }
}

// Call the updateQuestScore function to update the questScore
checkbox.addEventListener('change', updateQuestScore);


// Upload image to bucket and table-----------------------------------------------------------------------
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

            // Get Quest_ID
            const todayQuest = new Date().toISOString().split('T')[0];
            const { data: dailyQuest } = await supa
                .from('challengeToQuest')
                .select('id')
                .eq('created_at', todayQuest);

            // Get User_ID
            const initialUser = supa.auth.user();

            // Insert the URL, User_ID and Quest_ID into the 'images' table
            const { data: insertedData, error: insertError } = await supa
                .from('images')
                .insert( {
                    url: imageUrl.publicURL,
                    challenge_to_quest: dailyQuest[0].id,
                    user: initialUser.id,
                });

            //Error handling
            if (insertError) {
                console.error('Error inserting image URL:', insertError.message);
            } else {
                console.log('Image URL inserted successfully:', imageUrl);
            }
        }
    }
});



// Loading posts-----------------------------------------------------------------------
const imageContainer = document.querySelector('.quest_Images');
// Fetch the image URLs from the 'images' table
const { data: imageData, error: imageError } = await supa
    .from('images')
    .select('url')
    .order('created_at', { ascending: false });

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


// Challenge to daily quest--------------------------------------------------------

// Function to move one item from the "challenges" table to the "challengeToQuest" table
async function moveChallengeToQuest() {
  // Fetch all challenges
  const { data: challenges, error: fetchError } = await supa
    .from('challenges')
    .select('*');

  if (fetchError) {
    console.error('Error fetching challenges:', fetchError.message);
    return;
  }

  // Select a random challenge from the fetched data
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const selectedChallenge = challenges[randomIndex];

  try {
    // Insert the selected item into the "challengeToQuest" table
    const { data: insertedChallenge } = await supa
      .from('challengeToQuest')
      .insert({
        challenge: selectedChallenge.challenge,
        created_at: new Date().toISOString(),
      });
      
      console.log('Successfully moved challenge to challengeToQuest:', insertedChallenge);

  } catch (insertError) {
    console.error('Error inserting challenge into challengeToQuest:', insertError.message);
  }
}


// Move one challenge from "challenge" to "challenge to quest" per day
const { data: questCheck, error: fetchError } = await supa
    .from('challengeToQuest')
    .select('created_at')
    .order('created_at', { ascending: false })  /* choose newest quest */
    .limit(1);                                  /* only choose 1 quest */

// Activate function if there is no quest at all in the "challengeToQuest" table
if (questCheck.length === 0) {
    moveChallengeToQuest();
}

const newQuestCheck = questCheck[0].created_at;
const isItToday = new Date().toISOString().split('T')[0];

// Activate function if today no quest was moved to the "challengeToQuest" table
if (newQuestCheck !== isItToday || questCheck.length === 0) {
    moveChallengeToQuest();
}


// Daily quest-----------------------------------------------------------------------
const today = new Date().toISOString().split('T')[0];

// Fetch the quest from the Supabase table
const { data, error } = await supa
    .from('challengeToQuest')
    .select('challenge')
    .eq('created_at', today);

if (error) {
    console.error('Error fetching challenges:', error.message);
}

console.log('Fetched challenges:', data);

// Get the value from the data response
const text = data[0].challenge;

// Update the text content of the <h1> element
document.getElementById('daily_Quest_2').textContent = text;
