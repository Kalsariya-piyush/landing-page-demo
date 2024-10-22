// Initialize Swiper for Logo Slider
const swiper = new Swiper('.logo-slider', {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  slidesPerView: 3,
  spaceBetween: 30,
});

// Scroll animation
document.addEventListener('DOMContentLoaded', function () {
  const fadeInOnScroll = (selector) => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    elements.forEach((element) => observer.observe(element));
  };

  fadeInOnScroll('.fade-in-section');
});

// Form validations
document
  .getElementById('demoForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Validate fields
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const website = document.getElementById('website').value.trim();
    const revenue = document.getElementById('revenue').value.trim();

    if (!firstName) {
      showError('firstNameError', 'First name is required.');
      isValid = false;
    }

    if (!validateEmail(email)) {
      showError('emailError', 'Please enter a valid email.');
      isValid = false;
    }

    if (!validatePhone(phone)) {
      showError('phoneError', 'Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    if (!website) {
      showError('websiteError', 'Website URL is required.');
      isValid = false;
    }

    if (!revenue) {
      showError('revenueError', 'Please select a revenue option.');
      isValid = false;
    }

    // If all fields are valid, show success toast
    if (isValid) {
      showToast();
      document.getElementById('demoForm').reset();
    }
  });

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[0-9]{10}$/; // Assumes 10-digit phone numbers
  return re.test(phone);
}

// Show error message
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

// Clear error messages
function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach((element) => {
    element.textContent = '';
    element.style.display = 'none';
  });
}

// Show toast on success
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

// Add onBlur and onChange validation to inputs
const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
  input.addEventListener('blur', function () {
    validateField(this);
  });
  input.addEventListener('input', function () {
    validateField(this);
  });
});

function validateField(input) {
  const value = input.value.trim();
  if (input.id === 'firstName' && !value) {
    showError('firstNameError', 'First name is required.');
  } else if (input.type === 'email' && !validateEmail(value)) {
    showError('emailError', 'Please enter a valid email.');
  } else if (input.id === 'phone' && !validatePhone(value)) {
    showError('phoneError', 'Please enter a valid 10-digit phone number.');
  } else if (input.id === 'website' && !value) {
    showError('websiteError', 'Website URL is required.');
  } else if (input.id === 'revenue' && !value) {
    showError('revenueError', 'Please select a revenue option.');
  } else {
    clearError(input.id + 'Error');
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
}
