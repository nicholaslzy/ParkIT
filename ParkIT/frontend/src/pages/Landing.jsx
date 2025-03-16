import { Link } from 'react-router-dom';

function Landing(){
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/app">Open app</Link>
    </div>
  );
};

export default Landing;