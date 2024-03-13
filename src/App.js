import "./App.css";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const debounce = (func, delay) => {
    // debounc func ensure that func doesn't is not called too frequently
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const extractHashtags = (text) => {
    //string text and returns an array of hashtags extracted from the text using a regular expression.
    return text.match(/#\w+/g) || [];
  };

  const updateTags = () => {
    // add new set of hastag to the exist one
    const extractedHashtags = [...new Set(extractHashtags(text))];
    setHashtags(extractedHashtags);
  };

  const debouncedUpdateTags = debounce(updateTags, 300);

  const handleInputChange = (event) => {
    // every input will striggle func
    setText(event.target.value);
    debouncedUpdateTags();
  };

  const handleSubmit = (event) => {
    // when submit, we will get a total amount of hastag
    event.preventDefault();
    const extractedHashtags = extractHashtags(text);
    alert("Hashtags: " + extractedHashtags.join(" "));
    setText("");
    setHashtags([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleInputChange}
          rows="4"
          cols="50"
          placeholder="Type something here..."
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div id="tags">
        {hashtags.map((hashtag, index) => (
          <span key={index}>{hashtag}</span>
        ))}
      </div>
    </div>
  );
}

export default App;
