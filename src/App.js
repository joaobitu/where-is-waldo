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
  const [display, setDisplay] = useState("none");
  const [modalDsiplay, setModalDisplay] = useState("none");
  const [options, setOptions] = useState(["waldo", "odlaw", "wizard"]);
  const [visibility, setVisibility] = useState("block");

  useEffect(() => {
    if (count === 0) {
      getDB();
    }
    if (options.length === 0) {
      displayLeaderboard();
      return;
    }

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

  const getDB = async () => {
    const data = await getDocs(usersReference);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const verifyIsThere = (x1, y1, x2, y2) => {
    if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) < 25) {
      if (x1 === 525 && y1 === 360) {
        const placeholder = options.filter((o) => o !== "waldo");
        setOptions(placeholder);
        return true;
      } else if (x1 === 624 && y1 === 357) {
        const placeholder = options.filter((o) => o !== "wizard");
        setOptions(placeholder);
        return true;
      }

      const placeholder = options.filter((o) => o !== "odlaw");
      setOptions(placeholder);
      return true;
    }
  };

  const square = (e) => {
    console.log("x:" + e.nativeEvent.offsetX + " y:" + e.nativeEvent.offsetY);
    setDisplay("flex");
    setClickedX(e.nativeEvent.offsetX);
    setClickedY(e.nativeEvent.offsetY);
  };

  const addUser = async (e) => {
    await addDoc(usersReference, { name: newUser, time: count });
  };

  const displayLeaderboard = () => {
    setModalDisplay("flex");
  };

  return (
    <div className="App">
      <h1>Where is Waldo?</h1>
      <h3>Timer: {count} seconds</h3>
      <h3>Missing: {options.join(", ")}</h3>

      <div style={{ position: "relative" }}>
        <img
          className="waldo-image"
          src="https://jadenenz.github.io/wheres-waldo/static/media/waldo-beach.cd440f3b0de09b6c740f.jpg"
          alt="waldo"
          onClick={(e) => square(e)}
        />
        <div
          style={{
            display: display,
            position: "absolute",
            left: clickedX - 20 + "px",
            top: clickedY - 20 + "px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "40px", height: "40px", border: "2px solid black" }}
          ></div>
          <button
            onClick={() =>
              verifyIsThere(525, 360, Number(clickedX), Number(clickedY))
            }
          >
            waldo
          </button>
          <button
            onClick={() =>
              verifyIsThere(245, 360, Number(clickedX), Number(clickedY))
            }
          >
            odlaw
          </button>
          <button
            onClick={() =>
              verifyIsThere(624, 357, Number(clickedX), Number(clickedY))
            }
          >
            wizard
          </button>
        </div>
      </div>
      <div id="leaderboard-modal" style={{ display: modalDsiplay }}>
        <Leaderboard
          newUser={setNewUser}
          fetchData={getDB}
          userData={users}
          addUser={addUser}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </div>
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
