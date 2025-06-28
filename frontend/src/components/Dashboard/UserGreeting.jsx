const UserGreeting = ({ name }) => {
  return (
    <div className="user-greeting">
      <h1 className="text-4xl font bg-gradient-to-r from-blue-600 via-blue-800 to-purple-600 bg-clip-text text-transparent">
        Hi, {name}
      </h1>
    </div>
  );
};

export default UserGreeting;