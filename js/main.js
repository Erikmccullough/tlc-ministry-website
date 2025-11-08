// TLC Ministry website scripts (light version)

// Set current year in the footer
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Note: Additional interactivity (e.g., mobile menu toggles) can be
// implemented here in the future.