    document.addEventListener('DOMContentLoaded', () => {
      // 1. Live Wedding Countdown Clock (Counting down to Dec 19, 2026 at 2:00 PM)
      const weddingDate = new Date('December 19, 2026 14:00:00').getTime();
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
          if (daysEl) daysEl.textContent = '00';
          if (hoursEl) hoursEl.textContent = '00';
          if (minutesEl) minutesEl.textContent = '00';
          if (secondsEl) secondsEl.textContent = '00';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);

      // 2. Digital RSVP Guest Pass Modal
      const rsvpForm = document.getElementById('rsvpForm');
      const wedBackdrop = document.getElementById('wedBackdrop');
      const rsvpPassModal = document.getElementById('rsvpPassModal');
      const passGreeting = document.getElementById('passGreeting');
      const passDetails = document.getElementById('passDetails');
      const passCode = document.getElementById('passCode');
      const closePassBtn = document.getElementById('closePassBtn');

      function closePassModal() {
        rsvpPassModal.classList.remove('open');
        wedBackdrop.classList.remove('open');
      }

      closePassBtn.addEventListener('click', closePassModal);
      wedBackdrop.addEventListener('click', closePassModal);

      if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const guestName = document.getElementById('guestName').value.trim();
          const attendance = document.getElementById('attendanceSelect').value;
          const guestCount = document.getElementById('guestCountSelect').value;
          const notesInput = rsvpForm.querySelectorAll('input')[2];
          const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None';

          const randomPassNum = Math.floor(1000 + Math.random() * 9000);
          passCode.textContent = `GUEST PASS #AT-${randomPassNum}`;

          if (attendance === 'Joyfully Accepts') {
            passGreeting.textContent = `See You in Lagos, ${guestName}!`;
          } else {
            passGreeting.textContent = `Thank You, ${guestName}`;
          }

          passDetails.innerHTML = `
            <div><strong>Guest(s):</strong> ${guestName}</div>
            <div><strong>Status:</strong> ${attendance}</div>
            <div><strong>Party Size:</strong> ${guestCount}</div>
            <div><strong>Date:</strong> Saturday, December 19, 2026</div>
            <div><strong>Notes / Song:</strong> ${notes}</div>
          `;

          wedBackdrop.classList.add('open');
          rsvpPassModal.classList.add('open');
          rsvpForm.reset();
        });
      }
    });