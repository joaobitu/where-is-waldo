import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { Leaderboard } from "./leaderboard";

function App() {
  const [users, setUsers] = useState([]);
  const usersReference = collection(db, "leaderboard");
  const [newUser, setNewUser] = useState("");
  const [count, setCount] = useState(0);
  const [clickedX, setClickedX] = useState("");
  const [clickedY, setClickedY] = useState("");

  useEffect(() => {
    const timer = () => {
      setCount(count + 1);
    };

    // if you want it to finish at some point
    if (count > 1000) {
      return;
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [count]);

  useEffect(() => {
    console.log("being called");
    const getDB = async () => {
      const data = await getDocs(usersReference);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getDB();
  }, []);

  const square = (e) => {
    setClickedX(e.clientX + "px");
    console.log(clickedX);
    setClickedY(e.clientY + "px");
    console.log(clickedY);
    return (
      <div
        style={{
          position: "absolute",
          left: clickedX,
          top: clickedY,
          width: "100px",
          height: "100px",
          border: "5px solid black",
        }}
      ></div>
    );
  };

  const addUser = async (e) => {
    await addDoc(usersReference, { name: newUser, time: count });
  };

  return (
    <div className="App">
      <h1>Timer: {count} seconds</h1>
      <p>Find Waldo!</p>
      <img
        className="waldo-image"
        src="https://jadenenz.github.io/wheres-waldo/static/media/waldo-beach.cd440f3b0de09b6c740f.jpg"
        alt="waldo"
        onClick={(e) => square(e)}
      />
      <Leaderboard newUser={setNewUser} userData={users} addUser={addUser} />
    </div>
  );
}

export default App;

/*
requirements: timer on the front-end

where is waldo image, this image will have 3 characters already put in
I must store the ranges in wich these guys return as true in the database
when the user clicks, there must be a rectangle with the current possible options
if he gets one right, remove that from the options in the rectangle

when the game ends, allow the user to add his info to a leaderboard in the database, and sort the database from lowest to highest.


reference video for firebase:
https://www.youtube.com/watch?v=jCY6DH8F4oc
reference stackoverflow for finding coordinates on the image:
https://stackoverflow.com/questions/49807088/javascript-get-x-y-coordinates-of-click-in-image
*/
