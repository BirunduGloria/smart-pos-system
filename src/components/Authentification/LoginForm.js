import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '../../context/UserContext';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const loggedInUser = { username, role };
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    router.push(role === 'admin' ? '/inventory' : '/dashboard');
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-72">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;