import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

function Data() {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const [email, setEmail] = useState("");
  const [entry, setEntry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [clickedPasswordId, setClickedPasswordId] = useState(null); // Track the ID of the clicked password
  const [copiedPasswordId, setCopiedPasswordId] = useState(null); // Track the ID of the copied password
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false); // Track the visibility of copied message

  // useEffect hook for fetching data from the API
  useEffect(() => {
    fetch("https://password-protector.cyclic.app/saver", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEntry(data));

    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email);
    }
  }, [token]);

  // Logic for deleting a book's entry by targeting specific ID
  const del = (id) => {
    fetch(`https://password-protector.cyclic.app/saver/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setEntry(entry.filter((p) => p._id !== id));
    setSearchResults(searchResults.filter((p) => p._id !== id));
  };

  // Function to copy password to clipboard and display it on click
  const copyPassword = (password, id) => {
    navigator.clipboard.writeText(password);
    setCopiedPasswordId(id); // Set the ID of the copied password
    setCopiedMessageVisible(true); // Show "Copied" message
    setTimeout(() => {
      setCopiedPasswordId(null); // Reset copied password ID after 3 seconds
      setCopiedMessageVisible(false); // Hide "Copied" message after 3 seconds
    }, 3000);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      let url =
        "https://password-protector.cyclic.app/searcherapi/search?q=" +
        searchTerm;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    }
  }, [searchTerm, token]);

  return (
    <Wrapper>
      <h1 style={{ color: "white", fontSize: "1.5rem" }}>
        Welcome, <span>{email}!</span>
      </h1>
      <div className="search-bar">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
        />
        <Link to={{ pathname: "/data/create" }} className="btn">
          + Add Data
        </Link>
      </div>
      {copiedMessageVisible && <div style={{ color: "green" }}>Copied</div>}
      <table style={{ overflowX: "auto" }}>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Email</th>
            <th>Password (Click to view)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* If search results are empty, show "No results found" */}
          {searchTerm !== "" && searchResults.length === 0 && (
            <tr>
              <td colSpan="4">No results found</td>
            </tr>
          )}
          {/* If search results are not empty, but no records match the search term, show "No results found" */}
          {searchTerm !== "" &&
            searchResults.length > 0 &&
            searchResults.filter((p) =>
              p.organizationName
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ).length === 0 && (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          {/* Mapping the search results and setting in the Table */}
          {Array.isArray(searchResults) &&
            searchResults
              .filter((p) =>
                p.organizationName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((p) => {
                return (
                  <tr key={p._id}>
                    <td>{p.organizationName}</td>
                    <td>{p.emailUsed}</td>
                    <td>
                      <div
                        onClick={() =>
                          setClickedPasswordId(prevState =>
                            prevState === p._id ? null : p._id
                          )
                        }
                      >
                        {clickedPasswordId === p._id ? p.passwordUsed : "********"}
                        {copiedPasswordId === p._id && (
                          <span style={{ marginLeft: "20px", color: "green" }}>
                            (Copied)
                          </span>
                        )}
                        <span style={{ marginLeft: "40px", cursor: "pointer" }}>
                          <i
                            className="fa-solid fa-copy"
                            onClick={() => copyPassword(p.passwordUsed, p._id)}
                          ></i>
                        </span>
                      </div>
                    </td>
                    <td style={{ margin: "0 auto" }}>
                      <Link
                        to={`/data/${p._id}/edit`}
                        style={{ color: "white" }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this item?"
                            )
                          ) {
                            del(p._id);
                          }
                        }}
                        style={{ color: "white", marginLeft: "15px" }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Link>{" "}
                    </td>
                  </tr>
                );
              })}
          {/* If search results are empty, map the entries */}
          {!searchResults.length &&
            entry.map((p) => {
              return (
                <tr key={p._id}>
                  <td>{p.organizationName}</td>
                  <td>{p.emailUsed}</td>
                  <td>
                    <div
                      onClick={() =>
                        setClickedPasswordId(prevState =>
                          prevState === p._id ? null : p._id
                        )
                      }
                    >
                      {clickedPasswordId === p._id ? p.passwordUsed : "********"}
                      {copiedPasswordId === p._id && (
                        <span style={{ marginLeft: "20px", color: "green" }}>
                          (Copied)
                        </span>
                      )}
                      <span style={{ marginLeft: "40px", cursor: "pointer" }}>
                        <i className="fa-solid fa-copy" onClick={() => copyPassword( p.passwordUsed,p._id)}></i>
                      </span>
                    </div>
                  </td>
                  <td style={{ margin: "0 auto" }}>
                    <Link to={`/data/${p._id}/edit`} style={{ color: "white" }}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <Link
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this item?"
                          )
                        ) {
                          del(p._id);
                        }
                      }}
                      style={{ color: "white", marginLeft: "15px" }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Link>{" "}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default Data;
