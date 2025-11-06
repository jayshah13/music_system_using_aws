// Example: Add simple front-end form validation
document.getElementById("queryForm").addEventListener("submit", function(event) {
    const title = document.getElementById("title").value.trim();
    const artist = document.getElementById("artist").value.trim();
    const year = document.getElementById("year").value.trim();

    if (!title && !artist && !year) {
        alert("Please fill at least one field before querying!");
        event.preventDefault(); // stop form submission
    }
});
