// Simple JS for navigation toggle on small screens
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const linksContainer = document.querySelector('.nav-links');
  if (!toggle || !linksContainer) return;

  toggle.addEventListener('click', () => {
    // Toggle mobile menu
    const isVisible = linksContainer.style.display === 'flex' || linksContainer.style.display === 'block';
    if (isVisible) {
      linksContainer.style.display = 'none';
    } else {
      linksContainer.style.display = 'flex';
      linksContainer.style.flexDirection = 'column';
    }
  });

  // Close mobile menu when clicking a link
  const navLinks = linksContainer.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        linksContainer.style.display = 'none';
      }
    });
  });
});