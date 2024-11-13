import React, { useState } from 'react';

function ContactForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission
  async function handleSubmit(event) {
   // Prevent default form submission behavior (page reload)
    event.preventDefault();

    // Construct the payload as required by the API   
    const contactData = {
      properties: {
        firstname,
        lastname,
        email
      },
    };

    // Use try-catch to handle any errors that may occur during the API call
    try {
      const response = await fetch('/api/assessment/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      // Check if the response is not successful
      if (!response.ok) {
        console.error('HTTP error status:', response.status);
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        return;
      }

      const newContact = await response.json();
      console.log('New contact added:', newContact.properties);

      // Use a browser's custom event to notify ContactsTable component
      const event = new Event('contactAdded');
      // console.log('Dispatching contactAdded event')
      window.dispatchEvent(event);
      alert('Contact added successfully!');

      // Clear the input fields upon successful contact creation
      setFirstname('');
      setLastname('');
      setEmail('');

    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <br></br><input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required /><br></br>
      </label>
      <label>
        Last Name:
        <br></br><input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required /><br></br>
      </label>
      <label>
        Email:
        <br></br><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br></br>
      </label>
      <br></br><button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;