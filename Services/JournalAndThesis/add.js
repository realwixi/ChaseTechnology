// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjFID6_z3LDB6lYxv1SdT3z7y3DoKcSBs",
    authDomain: "chasetech-demo.firebaseapp.com",
    projectId: "chasetech-demo",
    storageBucket: "chasetech-demo.firebasestorage.app",
    messagingSenderId: "7511830280",
    appId: "1:7511830280:web:e0cb013de55b3a626c46bd",
    measurementId: "G-Q522F9Z03D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Form submission handler
document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const imageName = document.getElementById('imageFileName').value;
    const timestamp = new Date().toISOString();
    
    // Create blog post object
    const blogPost = {
        title: title,
        content: content,
        image: imageName,
        date: timestamp
    };
    
    // Push data to Firebase
    const newPostRef = database.ref('JournalAndThesis').push();
    newPostRef.set(blogPost)
        .then(() => {
            console.log('Blog post saved successfully!');
            // Reset form
            document.getElementById('blogForm').reset();
            // Refresh display
            fetchBlogPosts();
        })
        .catch((error) => {
            console.error('Error saving blog post: ', error);
            alert('Error saving blog post. Please try again.');
        });
});