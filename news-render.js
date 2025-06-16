document.addEventListener("DOMContentLoaded", () => {
  fetch("news.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("news-container");
      const entries = data.news.slice().reverse(); // Latest first

      if (entries.length === 0) {
        container.innerHTML = "<p class='text-gray-400'>No news yet.</p>";
        return;
      }

      entries.forEach((item, index) => {
        const section = document.createElement("div");
        section.innerHTML = `
          <div x-data="{ open: false }" class="bg-gray-800 rounded shadow p-4">
            <button class="w-full text-left text-lg font-semibold text-yellow-300 hover:text-yellow-200 flex justify-between"
                    @click="open = !open">
              ${item.title}
              <span x-text="open ? '▲' : '▼'"></span>
            </button>
                <div x-show="open" x-collapse.duration.300ms x-cloak class="mt-2 text-sm text-gray-300 transition-all">
                <p class="mb-1"><em>${item.date}</em></p>
                <p>${item.message}</p>
            </div>
          </div>
        `;
        container.appendChild(section);
      });
    })
    .catch((err) => {
      console.error("Failed to load news:", err);
      document.getElementById("news-container").innerHTML =
        "<p class='text-red-500'>Could not load news.</p>";
    });
});
