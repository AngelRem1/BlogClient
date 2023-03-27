import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JournalList() {
  const [journals, setJournals] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setEmail(user.email);
      } else {
        console.log("user is logged out");
        setEmail("");
      }
    });
  }, []);

  useEffect(() => {
    async function getJournals() {
      const res = await fetch(
        `https://dark-teal-millipede-slip.cyclic.app/journals`
      );

      if (!res.ok) {
        const message = `error: ${res.statusText}`;
        window.alert(message);
        return;
      }

      const journals = await res.json();
      setJournals(journals);
    }
    getJournals();

    return;
  }, [journals.length]);

  const Journal = (props) => (
    <tr>
      <td> {props.journal.name} </td>
      <td>
        {" "}
        {props.journal.entry}{" "}
        {props.journal.email === email ? (
          <>
            <button
              style={buttons}
              onClick={() => navigate(`/edit/${props.journal._id}`)}
            >
              Edit
            </button>

            <button
              style={buttons}
              onClick={() => {
                props.deleteJournal(props.journal._id);
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <></>
        )}{" "}
      </td>
    </tr>
  );

  async function deleteJournal(id) {
    await fetch(`https://dark-teal-millipede-slip.cyclic.app/${id}`, {
      method: "DELETE",
    });

    const newJournals = journals.filter((el) => el._id !== id);
    setJournals(newJournals);
  }

  const journalList = () => {
    return journals.map((journal) => {
      return (
        <Journal
          journal={journal}
          key={journal._id}
          deleteJournal={() => deleteJournal(journal._id)}
        />
      );
    });
  };

  return (
    <div style={container}>
      <h2 style={title}> List of the Journals! </h2>

      <table style={table}>
        <thead style={thead}>
          <tr>
            <th>Name</th>
            <th>Entry</th>
          </tr>
        </thead>

        <tbody>{journalList()} </tbody>
      </table>
    </div>
  );
}

const container = {
  flex: 1,
  textAlign: "center",
  backgroundColor: "#E1FFFF",
  height: "calc(100vh - 60px)",
};

const title = {
  color: "#009879",
  marginBottom: "50px",
};

const table = {
  width: "60%",
  marginLeft: "auto",
  marginRight: "auto",
  boxShadow: "0 0 40px rgba(0, 0, 0, 0.15)",
  borderBottom: "2px solid #009879",
  borderRadius: "10px",
  overflow: "hidden",
};

const thead = {
  backgroundColor: "#009879",
  color: "#ffffff",
  textAlign: "center",
};

const buttons = {
  backgroundColor: "#ffffff",
  color: "black",
  border: "1px solid #4CAF50",
  marginRight: "8px",
  borderRadius: "8px",
};
