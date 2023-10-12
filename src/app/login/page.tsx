'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // for redirect
import { axios } from 'axios';
import React from 'react';

export default function LoginupPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLoginUp = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Loginup</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className='p-4 '
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">password</label>
      <input
        className='p-4 '
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Email"
      />
      <button onClick={onLoginUp} className="">SignUp Here</button>
      <Link href='/signup'>Visit SignUp Page</Link>
    </div>
  );
}
