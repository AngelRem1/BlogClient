import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function JournalList() {
  const [journals, setJournals] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email);
        setEmail(user.email);
      } else {
        console.log("user is logged out");
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
      <td> {props.journal.entry} </td>

      {console.log(props.journal)}
      {props.journal.email === email ? (
        <td>
          <Link to={`/edit/${props.journal._id}`}> Edit </Link>

          <button
            onClick={() => {
              props.deleteJournal(props.journal._id);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </td>
      ) : (
        <></>
      )}
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
    <div>
      <h2> List of the Journals! </h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Entry</th>
          </tr>
        </thead>

        <tbody> {journalList()} </tbody>
      </table>
    </div>
  );
}
