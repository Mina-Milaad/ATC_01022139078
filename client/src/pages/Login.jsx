import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login({ email, password });

      // Get the user after login from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser?.role?.toLowerCase() === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
        <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  );
}
