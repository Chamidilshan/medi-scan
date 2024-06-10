import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-2 mb-5 uppercase sm:px-6">
      <Link cla to="/home" className="pr-5">
        MediScan
      </Link>
    <div>
    <Link to="/scan" className="pr-5">
        Upload Document
      </Link>
      <Link to="/" className="pr-5">
        Document History
      </Link>
      <Link to="/" className="pr-5">
        Settings
      </Link>
    </div>
    
    </header>
  );
}

export default Header