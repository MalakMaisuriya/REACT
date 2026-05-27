import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import TopBar from "./Components/TopBar";
import Sidebar from "./Components/Sidebar";
import ContactList from "./Components/ContactList";
import ContactDetail from "./Components/ContactDetail";
import ContactForm from "./Components/ContactForm";
import PlaceholderPage from "./Components/PlaceholderPage";
import LabelPage from "./Components/LabelPage";
import TrashPage from "./Components/TrashPage";
import FrequentPage from "./Components/FrequentPage";
import "./index.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [trash, setTrash] = useState([]);

  const SEED = [
    {
      id: 1,
      first: "Ayaan",
      last: "Maisuriya",
      email: "ayaan.m@gmail.com",
      phone: "+91 90123 45678",
      company: "Google",
      label: "Work",
    },
    {
      id: 2,
      first: "Kiara",
      last: "Maisuriya",
      email: "kiara.m@yahoo.com",
      phone: "+91 91234 56789",
      company: "Amazon",
      label: "Home",
    },
    {
      id: 3,
      first: "Reyansh",
      last: "Maisuriya",
      email: "reyansh.m@outlook.com",
      phone: "+91 92345 67890",
      company: "Microsoft",
      label: "Mobile",
    },
    {
      id: 4,
      first: "Myra",
      last: "Maisuriya",
      email: "myra.m@gmail.com",
      phone: "+91 93456 78901",
      company: "Adobe",
      label: "Work",
    },
    {
      id: 5,
      first: "Arnav",
      last: "Maisuriya",
      email: "arnav.m@gmail.com",
      phone: "+91 94567 89012",
      company: "Netflix",
      label: "Home",
    },
    {
      id: 6,
      first: "Anika",
      last: "Maisuriya",
      email: "anika.m@icloud.com",
      phone: "+91 95678 90123",
      company: "Spotify",
      label: "Mobile",
    },
    {
      id: 7,
      first: "Vivaan",
      last: "Maisuriya",
      email: "vivaan.m@gmail.com",
      phone: "+91 96789 01234",
      company: "Tesla",
      label: "Work",
    },
    {
      id: 8,
      first: "Sara",
      last: "Maisuriya",
      email: "sara.m@yahoo.com",
      phone: "+91 97890 12345",
      company: "Meta",
      label: "Home",
    },
    {
      id: 9,
      first: "Kabir",
      last: "Maisuriya",
      email: "kabir.m@gmail.com",
      phone: "+91 98901 23456",
      company: "Apple",
      label: "Mobile",
    },
    {
      id: 10,
      first: "Ira",
      last: "Maisuriya",
      email: "ira.m@gmail.com",
      phone: "+91 99012 34567",
      company: "Intel",
      label: "Work",
    },
    {
      id: 11,
      first: "Dhruv",
      last: "Maisuriya",
      email: "dhruv.m@outlook.com",
      phone: "+91 90111 22334",
      company: "IBM",
      label: "Home",
    },
    {
      id: 12,
      first: "Riya",
      last: "Maisuriya",
      email: "riya.m@gmail.com",
      phone: "+91 91222 33445",
      company: "Oracle",
      label: "Mobile",
    },
    {
      id: 13,
      first: "Krish",
      last: "Maisuriya",
      email: "krish.m@gmail.com",
      phone: "+91 92333 44556",
      company: "Salesforce",
      label: "Work",
    },
    {
      id: 14,
      first: "Tara",
      last: "Maisuriya",
      email: "tara.m@yahoo.com",
      phone: "+91 93444 55667",
      company: "Uber",
      label: "Home",
    },
    {
      id: 15,
      first: "Yash",
      last: "Maisuriya",
      email: "yash.m@gmail.com",
      phone: "+91 94555 66778",
      company: "Airbnb",
      label: "Mobile",
    },
    {
      id: 16,
      first: "Aditya",
      last: "Patel",
      email: "aditya.patel@gmail.com",
      phone: "+91 90111 77889",
      company: "Infosys",
      label: "Work",
    },
    {
      id: 17,
      first: "Nisha",
      last: "Shah",
      email: "nisha.shah@yahoo.com",
      phone: "+91 91222 88990",
      company: "TCS",
      label: "Home",
    },
    {
      id: 18,
      first: "Kunal",
      last: "Mehta",
      email: "kunal.mehta@outlook.com",
      phone: "+91 92333 99001",
      company: "Wipro",
      label: "Mobile",
    },
    {
      id: 19,
      first: "Pooja",
      last: "Sharma",
      email: "pooja.sharma@gmail.com",
      phone: "+91 93444 10112",
      company: "HCL Tech",
      label: "Work",
    },
    {
      id: 20,
      first: "Rahul",
      last: "Verma",
      email: "rahul.verma@gmail.com",
      phone: "+91 94555 21223",
      company: "OYO",
      label: "Home",
    },
    {
      id: 21,
      first: "Snehal",
      last: "Desai",
      email: "snehal.desai@gmail.com",
      phone: "+91 95666 32334",
      company: "Reliance",
      label: "Mobile",
    },
    {
      id: 22,
      first: "Amit",
      last: "Trivedi",
      email: "amit.trivedi@yahoo.com",
      phone: "+91 96777 43445",
      company: "Adani Group",
      label: "Work",
    },
    {
      id: 23,
      first: "Riddhi",
      last: "Joshi",
      email: "riddhi.joshi@gmail.com",
      phone: "+91 97888 54556",
      company: "Zomato",
      label: "Home",
    },
    {
      id: 24,
      first: "Hardik",
      last: "Pandya",
      email: "hardik.pandya@gmail.com",
      phone: "+91 98999 65667",
      company: "Dream11",
      label: "Mobile",
    },
    {
      id: 25,
      first: "Bhavna",
      last: "Kapoor",
      email: "bhavna.kapoor@outlook.com",
      phone: "+91 90000 76778",
      company: "HDFC Bank",
      label: "Work",
    },
    {
      id: 26,
      first: "Jay",
      last: "Solanki",
      email: "jay.solanki@gmail.com",
      phone: "+91 91111 87889",
      company: "Paytm",
      label: "Home",
    },
    {
      id: 27,
      first: "Komal",
      last: "Chauhan",
      email: "komal.chauhan@gmail.com",
      phone: "+91 92222 98990",
      company: "Nykaa",
      label: "Mobile",
    },
    {
      id: 28,
      first: "Manav",
      last: "Agarwal",
      email: "manav.agarwal@yahoo.com",
      phone: "+91 93333 09001",
      company: "Flipkart",
      label: "Work",
    },
    {
      id: 29,
      first: "Neha",
      last: "Bansal",
      email: "neha.bansal@gmail.com",
      phone: "+91 94444 10123",
      company: "Swiggy",
      label: "Home",
    },
    {
      id: 30,
      first: "Siddharth",
      last: "Malhotra",
      email: "siddharth.m@gmail.com",
      phone: "+91 95555 21234",
      company: "Amazon",
      label: "Mobile",
    },
  ];

  const [q, setQ] = useState("");
  const [contacts, setContacts] = useState(SEED);

  return (
    <>
      <TopBar q={q} setQ={setQ} />
      <div className="app-layout">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  contacts={contacts}
                  q={q}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route
              path="/contact/:id"
              element={
                <ContactDetail
                  contacts={contacts}
                  setContacts={setContacts}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  trash={trash}
                  setTrash={setTrash}
                />
              }
            />
            <Route
              path="/new"
              element={
                <ContactForm contacts={contacts} setContacts={setContacts} />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ContactForm
                  contacts={contacts}
                  setContacts={setContacts}
                  edit
                />
              }
            />
            <Route
              path="/frequent"
              element={
                <FrequentPage
                  contacts={contacts}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              }
            />
            <Route
              path="/directory"
              element={
                <PlaceholderPage
                  icon="bi-building"
                  title="Directory"
                  desc="Your organization's contacts will appear here."
                />
              }
            />
            <Route
              path="/trash"
              element={
                <TrashPage
                  trash={trash}
                  setTrash={setTrash}
                  setContacts={setContacts}
                />
              }
            />
            <Route
              path="/import"
              element={
                <PlaceholderPage
                  icon="bi-upload"
                  title="Import contacts"
                  desc="Upload a CSV or vCard file."
                />
              }
            />
            <Route
              path="/export"
              element={
                <PlaceholderPage
                  icon="bi-download"
                  title="Export contacts"
                  desc="Download your contacts as a CSV or vCard."
                />
              }
            />
            <Route
              path="/label/:name"
              element={<LabelPage contacts={contacts} />}
            />
          </Routes>
        </main>
      </div>

      <Link to="/new" className="fab d-flex d-md-none" title="New contact">
        <i className="bi bi-plus-lg"></i>
      </Link>
    </>
  );
};

export default App;
