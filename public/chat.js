// Function to fetch and display all messages from the server
function loadMessages() {
    fetch('http://13.233.206.2:3000/messages')
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML = '';  // Clear existing messages
            data.messages.forEach(message => {
                const newMessage = document.createElement('div');
                newMessage.textContent = message;
                messagesDiv.appendChild(newMessage);
            });

            // Scroll to the latest message
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        })
        .catch(err => console.error('Error loading messages:', err));
}

// Call loadMessages initially to show existing messages when the page loads
loadMessages();

// Function to send a message to the server via HTTP POST
function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();  // Get the input value and trim any whitespace

    if (message !== '') {
        // Send the message using a POST request
        fetch('http://13.233.206.2:3000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Message sent:', data);
                loadMessages();  // Reload messages after sending
            })
            .catch(err => console.error('Error sending message:', err));

        // Optionally display your own message (echo) in the chat window
        const messagesDiv = document.getElementById('messages');
        const myMessage = document.createElement('div');
        myMessage.textContent = `You: ${message}`;
        myMessage.style.fontStyle = 'italic';  // Style for your own messages
        messagesDiv.appendChild(myMessage);

        // Scroll to the latest message
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        // Clear the input field after sending
        messageInput.value = '';
    } else {
        alert('Please type a message before sending.');
    }
}

