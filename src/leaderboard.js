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
      <input
        placeholder="name"
        onChange={(e) => props.newUser(e.target.value)}
      />
      <button onClick={() => props.addUser()}>Create User</button>
      {displayLeaderboard()}
    </div>
  );
};
