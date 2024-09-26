// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVP2qTS-ggpOU_OHmErshd2AVL-fgCJZk",
    authDomain: "bookarc-25a01.firebaseapp.com",
    projectId: "bookarc-25a01",
    storageBucket: "bookarc-25a01.appspot.com",
    messagingSenderId: "489680328601",
    appId: "1:489680328601:web:cdd6691f6359cd0342e508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and display notes
async function fetchNotes() {
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = ""; // Clear the current list
    
    // Fetch notes from Firestore
    const querySnapshot = await getDocs(collection(db, "notes"));
    
    // Loop through each document and prepend it to the list
    querySnapshot.forEach((doc) => {
        const li = document.createElement("li");
        li.textContent = doc.data().content;
        
        // Create the delete button with the trash icon
        const deleteButton = document.createElement("button");
        const trashIcon = document.createElement("img");
        trashIcon.src = "icons/delete-icon.svg"; // Path to the trash icon
        trashIcon.alt = "Delete";
        deleteButton.appendChild(trashIcon);
        
        // Attach the delete functionality
        deleteButton.onclick = () => deleteNote(doc.id);
        
        // Append the delete button to the list item
        li.appendChild(deleteButton);
        
        // Prepend the list item to the top of the list
        notesList.prepend(li);
    });
}


// Add a new note
window.addNote = async function() {
    const noteInput = document.getElementById("noteInput");
    const content = noteInput.value.trim();
    if (content !== "") {
        try {
            await addDoc(collection(db, "notes"), {
                content: content
            });
            noteInput.value = "";
            fetchNotes();
        } catch (error) {
            console.error("Error adding note: ", error);
        }
    }
}

// Delete a note
async function deleteNote(id) {
    try {
        await deleteDoc(doc(db, "notes", id));
        fetchNotes();
    } catch (error) {
        console.error("Error deleting note: ", error);
    }
}

// Initial fetch
fetchNotes();
