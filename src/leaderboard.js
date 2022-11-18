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
    return sortedUser.map((user) => {
      return (
        <div key={sortedUser.indexOf(user)}>
          <h1>Name: {user.name}</h1>
          <h1>Time: {user.time}</h1>
        </div>
      );
    });
  };

  return (
    <div className="leaderboard-modal">
      <input
        placeholder="name"
        onChange={(e) => props.newUser(e.target.value)}
      />
      <button onClick={() => props.addUser()}>Create User</button>
      {displayLeaderboard()}
    </div>
  );
};
