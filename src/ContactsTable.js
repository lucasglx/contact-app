import React, {useState, useEffect} from 'react';

function ContactsTable(){
  const [contacts, setContacts] = useState([]);
  
  // GET Contacts list API call
  async function fetchContacts(){
    try{
      // Base URL defined in package.json to avoid CORS errors
      const response = await fetch('/api/assessment/contacts');
      if (!response.ok) {
        console.error('Failed to fetch contacts:', response.status);
        return;
      }
      const data = await response.json();
      setContacts(data.results);
    } catch(error){
      console.error('There was an error fetching contacts:', error);
    }
  }

  // Fetch contacts when the component mounts
  useEffect(()=> {
    fetchContacts();

    // Event listener to refetch contacts when a contact is added
    async function handleContactAdded(){
      // Adding delay for server processing before fetching contacts again
      await new Promise(resolve => setTimeout(resolve, 5000));
      fetchContacts();
      console.log('Contacts table is fetched again');
    }
    // Listen to the event created in ContactForm to trigger the Contacts list refresh
    window.addEventListener('contactAdded', handleContactAdded);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('contactAdded', handleContactAdded);
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <tr key={contact.id}>
            <td>{contact.properties.firstname}</td>
            <td>{contact.properties.lastname}</td>
            <td>{contact.properties.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;