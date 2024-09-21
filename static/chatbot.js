document.addEventListener('DOMContentLoaded', () => {
    const chatbotImg = document.getElementById("chatbot-img");
    const chatboxDiv = document.getElementById("chatbox");
    const messagesDiv = document.getElementById('messages');  
    const userInputDiv = document.getElementById('user-input');
    const dateInputDiv = document.getElementById('date-input');
    const ticketInputDiv = document.getElementById('ticket-input');
    const ticketCountInputDiv = document.getElementById('ticket-count-input');
    const userNameInput = document.getElementById('user-name');
    const visitDateInput = document.getElementById('visit-date');
    const ticketIdInput = document.getElementById('ticket-id');
    const numAdultsInput = document.getElementById('num-adults');
    const numChildrenInput = document.getElementById('num-children');
    const numSeniorCitizensInput = document.getElementById('num-senior-citizens');
    const submitNameButton = document.getElementById('submit-name');
    const submitDateButton = document.getElementById('submit-date');
    const submitTicketButton = document.getElementById('submit-ticket');
    const submitTicketCountButton = document.getElementById('submit-ticket-count');
    const bookTicketButton = document.getElementById('book-ticket');
    const cancelTicketButton = document.getElementById('cancel-ticket');
    const showInfoButton = document.getElementById('show-info');

    let currentOperation = null;
    let userName = '';

    function appendMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Scroll to the bottom
    }

    function resetUI() {
        userInputDiv.style.display = 'none';
        dateInputDiv.style.display = 'none';
        ticketInputDiv.style.display = 'none';
        ticketCountInputDiv.style.display = 'none';
    }

    function hideButtons() {
        bookTicketButton.style.display = 'none';
        cancelTicketButton.style.display = 'none';
        showInfoButton.style.display = 'none';
    }

    function startChat() {
        appendMessage("Welcome to the Museum.", false);
        appendMessage("Hello I am Mitra, made by Sanju.", false);
        appendMessage("Please select your preferred options:", false);
        resetUI();
    }

    chatbotImg.addEventListener('click', function() {
        if (chatboxDiv.style.display === 'none' || chatboxDiv.style.display === '') {
            chatboxDiv.style.display = 'block';
            startChat();
        } else {
            chatboxDiv.style.display = 'none';
        }
    });

    function restartChat() {
        appendMessage(" Please select your preferred options:", false);
        resetUI();
        bookTicketButton.style.display = 'block';
        cancelTicketButton.style.display = 'block';
        showInfoButton.style.display = 'block';
    }

    bookTicketButton.addEventListener('click', () => {
        resetUI();
        hideButtons();
        appendMessage("Please enter your name:", false);
        userInputDiv.style.display = 'block';
        currentOperation = 'booking';
    });

    submitNameButton.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (name) {
            userName = name;
            userInputDiv.style.display = 'none';
            appendMessage(`You: ${name}`, true);
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
            appendMessage(`You: ${visitDate}`, true);
            appendMessage("Please enter ticket details (adults, children, senior citizens):", false);
            ticketCountInputDiv.style.display = 'block';
            currentOperation = 'bookingTicketCount';
        } else {
            appendMessage("Please select a date.", false);
        }
    });

    submitTicketCountButton.addEventListener('click', () => {
        const numAdults = parseInt(numAdultsInput.value) || 0;
        const numChildren = parseInt(numChildrenInput.value) || 0;
        const numSeniorCitizens = parseInt(numSeniorCitizensInput.value) || 0;

        if (numAdults > 0 || numChildren > 0 || numSeniorCitizens > 0) {
            ticketCountInputDiv.style.display = 'none';
            appendMessage(`Adults: ${numAdults}, Children: ${numChildren}, Senior Citizens: ${numSeniorCitizens}`, true);
            appendMessage("Booking your ticket. Please wait...", false);
            bookTicket(userName, visitDateInput.value, numAdults, numChildren, numSeniorCitizens);
        } else {
            appendMessage("Please enter at least one ticket count.", false);
        }
    });

    function bookTicket(userName, visitDate, numAdults, numChildren, numSeniorCitizens) {
        fetch('/book-ticket/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                user_name: userName,
                visit_date: visitDate,
                num_adults: numAdults,
                num_children: numChildren,
                num_senior_citizens: numSeniorCitizens,
               // total_price : total_price,
            }),
        }).then(response => response.json())
          .then(data => {
              appendMessage(`Ticket Booked Successfully!<br><br>Booking Details:<br>
                Name: ${userName}<br>
                Visit Date: ${data.visit_date}<br>
                Number of persons: ${data.total_no_of_persons}<br>
                Total Price: Rs.${data.total_price}<br>
                Ticket ID: ${data.ticket_id}<br>`, false);
              appendMessage("Thank you for booking your ticket!", false);
              restartChat();
          });
    }

    cancelTicketButton.addEventListener('click', () => {
        resetUI();
        hideButtons();
        appendMessage("Please enter your ticket ID to cancel:", false);
        ticketInputDiv.style.display = 'block';
        currentOperation = 'canceling';
    });

    submitTicketButton.addEventListener('click', () => {
        const ticketId = ticketIdInput.value.trim();
        if (ticketId) {
            ticketInputDiv.style.display = 'none';
            appendMessage(`You: ${ticketId}`, true);
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
              restartChat();
          });
    }

    showInfoButton.addEventListener('click', () => {
        resetUI();
        hideButtons();
        appendMessage("Fetching exhibit information...", false);
        fetch('/exhibit-info/')
            .then(response => response.json())
            .then(data => {
                let message = 'Exhibits:\n';
                data.forEach(exhibit => {
                    message += `Name: ${exhibit.name}\nDescription: ${exhibit.description}\nOpening Hours: ${exhibit.opening_hours}\n\n`;
                });
                appendMessage(message, false);
                restartChat();
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
