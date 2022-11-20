import React from "react";

export const Leaderboard = (props) => {
  const displayLeaderboard = () => {
    const sortedUser = props.userData;
    sortedUser.sort((a, b) => {
      if (Number(a.time) > Number(b.time)) {
        return 1;
      }
      if (Number(a.time) < Number(b.time)) {
        return -1;
      }
      return 0;
    });
    return sortedUser.map((user, index) => {
      if (index < 10)
        return (
          <div key={index}>
            <h4>
              {index + 1}: Name: {user.name}------------Time: {user.time}
            </h4>
          </div>
        );
    });
  };

  return (
    <div className="leaderboard-modal">
      <h3>Add your score!</h3>
      <input
        style={{ display: props.visibility }}
        placeholder="name"
        onChange={(e) => {
          props.newUser(e.target.value);
        }}
      />
      <button
        style={{ display: props.visibility }}
        onClick={() => {
          props.addUser();
          props.fetchData();
          props.setVisibility("none");
        }}
      >
        Create User
      </button>
      <h1>TOP 10</h1>
      {displayLeaderboard()}
    </div>
  );
};
