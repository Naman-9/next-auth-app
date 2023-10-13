'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // for redirect
import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/user/login', user);
      console.log('Login Success', response.data);
      toast.success('Login Success');
      router.push('profile');

    } catch (e: any) {
      console.log('Login failed', e.message);
      toast.error(e.message);

    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button onClick={onLogin} className="">
        SignUp Here
      </button>
      <Link href="/signup">Visit SignUp Page</Link>
    </div>
  );
}
