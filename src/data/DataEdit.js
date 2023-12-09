import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

function DataEdit() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  //useParams returns an object of key/value pairs of URL parameters
  const { id } = useParams();
  //Using useState hook for setting title and author
  const [organizationName, setorganizationName] = useState("");
  const [emailUsed, setemailUsed] = useState("");
  const [passwordUsed, setpasswordUsed] = useState("");
  const navigate = useNavigate();

  //useEffect hook for fetching data and dynamically setting values
  useEffect(() => {
    fetch(`https://password-protector.cyclic.app/saver/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((book) => {
        setorganizationName(book.organizationName);
        setemailUsed(book.emailUsed);
        setpasswordUsed(book.passwordUsed);
      });
    // eslint-disable-next-line
  }, []);

  //Its logic for fetching already filled data and Patching or updating data
  const submit = (e) => {
    e.preventDefault();
    fetch(`https://password-protector.cyclic.app/saver/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ organizationName, emailUsed, passwordUsed }),
    }).then(() => navigate("/data"));
  };

  return (
    <Wrapper>
      <form onSubmit={submit} className="Edit-form">
        <label>Organization</label>
        <input
          type="text"
          name="organizationName"
          defaultValue={organizationName}
          onChange={(e) => setorganizationName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          name="emailUsed"
          defaultValue={emailUsed}
          onChange={(e) => setemailUsed(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          name="passwordUsed"
          defaultValue={passwordUsed}
          onChange={(e) => setpasswordUsed(e.target.value)}
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Save
        </button>
      </form>
    </Wrapper>
  );
}

export default DataEdit;
