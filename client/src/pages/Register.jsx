import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', {
        userName,
        email,
        address,
        password,
        phone
      });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full p-2 text-white mb-4 border rounded"
          required
        />

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 text-white mb-4 border rounded"
          required
        />

        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-2 text-white mb-4 border rounded"
          required
        />

        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full p-2 text-white mb-4 border rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 text-white mb-4 border rounded"
          required
        />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Register</button>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
