function adminState() {
  return {
    open: false,
    adminUnlocked: false,
    handleAdminClick() {
      if (!this.adminUnlocked) {
        const pw = prompt("Enter Admin Password");
        if (pw === "monkeAccess") {
          this.adminUnlocked = true;
          this.open = true;
        } else {
          alert("Incorrect password!");
        }
      } else {
        this.open = !this.open;
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Load latest streams for stream-edit.html
  const container = document.getElementById("streams");
  if (container) {
    fetch("AdminTools/Streams/streams.json")
      .then(res => res.json())
      .then(data => {
        container.innerHTML = data.streams.map(id => `
          <iframe width="560" height="315" 
                  src="https://www.youtube.com/embed/${id}" 
                  frameborder="0" allowfullscreen 
                  class="rounded-lg shadow-lg w-full max-w-xl mx-auto mb-6">
          </iframe>
        `).join("");
      });
  }

  // Optional: fallback for any manual admin link
  const adminLink = document.getElementById("admin-tools-link");
  if (adminLink) {
    adminLink.addEventListener("click", (e) => {
      e.preventDefault();
      const pw = prompt("Enter admin password:");
      if (pw === "monkeAccess") {
        window.location.href = "AdminTools/Streams/stream-edit.html";
      } else {
        alert("Wrong password!");
      }
    });
  }
});
