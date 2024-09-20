/*
timepass k liye bnaya tha 
iska koi kaam nhi hai project mai
use it for reference 

document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const userInputDiv = document.getElementById('user-input');
    const dateInputDiv = document.getElementById('date-input');
    const ticketInputDiv = document.getElementById('ticket-input');
    const userNameInput = document.getElementById('user-name');
    const visitDateInput = document.getElementById('visit-date');
    const ticketIdInput = document.getElementById('ticket-id');
    const submitNameButton = document.getElementById('submit-name');
    const submitDateButton = document.getElementById('submit-date');
    const submitTicketButton = document.getElementById('submit-ticket');

    let currentOperation = null; // Track the current operation (e.g., booking, canceling)

    function appendMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
    }

    function resetUI() {
        userInputDiv.style.display = 'none';
        dateInputDiv.style.display = 'none';
        ticketInputDiv.style.display = 'none';
    }

    function startChat() {
        appendMessage("Welcome to the Museum. Please select your preferred options:", false);
        resetUI();
    }

    startChat(); // Start the chat with the greeting message

    document.getElementById('book-ticket').addEventListener('click', () => {
        resetUI();
        appendMessage("Please enter your name:", false);
        userInputDiv.style.display = 'block';
        currentOperation = 'booking';
    });

    submitNameButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            userInputDiv.style.display = 'none';
            appendMessage("Please select the date of your visit:", false);
            dateInputDiv.style.display = 'block';
            currentOperation = 'bookingDate';
        } else {
            appendMessage("Name cannot be empty. Please enter your name again.", false);
        }
    });

    submitDateButton.addEventListener('click', () => {
        const visitDate = visitDateInput.value;
        if (visitDate) {
            dateInputDiv.style.display = 'none';
            appendMessage("Booking your ticket. Please wait...", false);
            bookTicket(userNameInput.value.trim(), visitDate);
        } else {
            appendMessage("Please select a date.", false);
        }
    });

    function bookTicket(userName, visitDate) {
        fetch('/book-ticket/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({user_name: userName, visit_date: visitDate}),
        }).then(response => response.json())
          .then(data => {
              appendMessage(`Your ticket has been booked for ${visitDate}. Ticket ID: ${data.ticket_id}`, false);
              startChat(); // Redirect to main options
          });
    }

    document.getElementById('cancel-ticket').addEventListener('click', () => {
        resetUI();
        appendMessage("Please enter your ticket ID to cancel:", false);
        ticketInputDiv.style.display = 'block';
        currentOperation = 'canceling';
    });

    submitTicketButton.addEventListener('click', () => {
        const ticketId = ticketIdInput.value.trim();
        if (ticketId) {
            ticketInputDiv.style.display = 'none';
            appendMessage("Cancelling your ticket. Please wait...", false);
            cancelTicket(ticketId);
        } else {
            appendMessage("Ticket ID cannot be empty. Please enter the ticket ID again.", false);
        }
    });

    function cancelTicket(ticketId) {
        fetch('/cancel-ticket/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ticket_id: ticketId}),
        }).then(response => response.json())
          .then(data => {
              appendMessage(data.message, false);
              startChat(); // Redirect to main options
          });
    }

    document.getElementById('show-info').addEventListener('click', () => {
        appendMessage("Fetching exhibit information...", false);
        fetch('/exhibit-info/')
            .then(response => response.json())
            .then(data => {
                let message = 'Exhibits:\n';
                data.forEach(exhibit => {
                    message += `Name: ${exhibit.name}\nDescription: ${exhibit.description}\nOpening Hours: ${exhibit.opening_hours}\n\n`;
                });
                appendMessage(message, false);
                startChat(); // Redirect to main options
            });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
*/