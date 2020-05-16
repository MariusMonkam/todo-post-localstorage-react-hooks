import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  //let's initialize the state
  //collect the post-list from localstorage and parse it with JSON.parse() method

  const postsData = JSON.parse(localStorage.getItem("posts"));
  //initilize our parsed data if there is no data inside our initial state will be set as empty array []
  //if there is data it our state will use postsData
  const [posts, setPosts] = useState(postsData || []);
  //initialize the state of title ''
  const [title, setTitle] = useState("");
  //initialize the state of message ''
  const [message, setMessage] = useState("");

  //let'set the new state of our
  const handleTitle = e => {
    setTitle(e.target.value);
  };

  //let's set the the new state of ou message
  const handleMessage = e => {
    setMessage(e.target.value);
  };
  //let's create the method to add the post on a list
  const AddPost = e => {
    e.preventDefault();
    setPosts([
      //the spread operator let us populate our array with the previous post
      ...posts,
      {
        //here we add the current title
        title,
        //here ue add the current message
        message
      }
    ]);
    //let clear the input box after adding our post
    setTitle("");
    setMessage("");
  };
  const removePost = title => {
    //removePost take title as argument
    //let's reset the post list after filtering post title which are not equal to title
    setPosts(posts.filter(item => item.title !== title));
  };
  // we use useeffect to save the post in our locastorage with the method setIntem()
  //The post is save in a JSON.stringifiý format and we wil need to parse it before
  //use it after collecting it with getItem() method
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  });
  return (
    <div className="App">
      <div className="box">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>

      {// To display the list of post we use map method
      posts.map(item => (
        //remember to set the key , each item need to have a key
        <div className="post" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.message}</p>
          <span>
            <button onClick={() => removePost(item.title)}>X</button>
          </span>
        </div>
      ))}
      <form onSubmit={AddPost}>
        <div className="form-container">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input type="text" value={title} onChange={handleTitle} />
        </div>
        <br />
        <div>
          <label htmlFor="message" className="label">
            Message
          </label>
          <textarea type="text" value={message} onChange={handleMessage} />
        </div>
        <button type="submit">AddPost</button>
      </form>
    </div>
  );
}
