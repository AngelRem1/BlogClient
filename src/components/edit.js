import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    entry: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJournal() {
      const id = params.id.toString();
      const res = await fetch(
        `https://dark-teal-millipede-slip.cyclic.app/journals/${params.id.toString()}`
      );

      if (!res.ok) {
        const message = `error has occurred: ${res.statusText} `;
        window.alert(message);
        return;
      }
      const journal = await res.json();
      if (!journal) {
        const message = `journal with id ${id} does not exist`;
        window.alert(message);
        navigate("/");
      }

      setForm(journal);
    }
    fetchJournal();

    return;
  }, [params.id, navigate]);

  const updateForm = (value) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  async function submitForm(e) {
    e.preventDefault();
    const editedJournal = {
      name: form.name,
      entry: form.entry,
    };

    await fetch(
      `https://dark-teal-millipede-slip.cyclic.app/journals/update/${params.id}`,
      {
        method: "POST",
        body: JSON.stringify(editedJournal),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    navigate("/");
  }

  return (
    <div style={container}>
      <h2 style={title}> Update Journal </h2>

      <form onSubmit={submitForm}>
        <div style={field}>
          <div style={fieldName}> Name </div>
          <input
            style={fieldInput}
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div style={field}>
          <div style={fieldName}> Form </div>
          <input
            style={fieldInput}
            type="text"
            id="entry"
            value={form.entry}
            onChange={(e) => updateForm({ entry: e.target.value })}
          />
        </div>

        <input style={submitButton} type="submit" value="Update journal" />
      </form>
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

const field = {
  marginBottom: "1em",
};

const fieldName = {
  color: "#009879",
};

const fieldInput = {
  borderRadius: "10px",
  borderWidth: "thin",
};

const submitButton = {
  backgroundColor: "#ffffff",
  color: "black",
  border: "2px solid #4CAF50",
  borderRadius: "5px",
};
