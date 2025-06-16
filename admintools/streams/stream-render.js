document.addEventListener('DOMContentLoaded', () => {
  fetch('AdminTools/Streams/streams.json')
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => {
      const streamList = document.getElementById('stream-list');
      if (!streamList || !data.streams || data.streams.length === 0) {
        streamList.innerHTML = '<p class="text-gray-400 text-center col-span-full">No streams available.</p>';
        return;
      }

      data.streams.forEach(link => {
        let embedUrl = link
          .replace("/watch?v=", "/embed/")
          .replace("youtu.be/", "www.youtube.com/embed/")
          .replace("www.youtube.com/live/", "www.youtube.com/embed/")
          .replace("youtube.com/live/", "www.youtube.com/embed/")
          .split("?")[0]; // Strip query params

        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.className = 'w-full aspect-video rounded-lg shadow-lg';
        iframe.allowFullscreen = true;
        iframe.frameBorder = 0;
        streamList.appendChild(iframe);
      });
    })
    .catch(err => {
      console.error("Stream loading failed:", err);
      const streamList = document.getElementById('stream-list');
      if (streamList) {
        streamList.innerHTML = '<p class="text-red-500 text-center col-span-full">Could not load streams.</p>';
      }
    });
});
