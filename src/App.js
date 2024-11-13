import './App.css';
import React from "react"
import ContactsTable from './ContactsTable';
import ContactForm from './ContactForm';

function App() {
  return (
    <div>
      <link rel="stylesheet"href="https://fonts.googleapis.com/css?family=Lexend+Deca"></link>
     <h1>HubSpot Technical Assessment</h1>
     <h2>Add New Contact</h2>
      <ContactForm/>
     <h2>HubSpot Contacts</h2>
      <ContactsTable/>
    </div>
  );
}
export default App;