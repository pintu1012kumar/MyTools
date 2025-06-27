'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    const uname = username.replace('https://github.com/', '').trim();
    if (!uname) return;
    router.push(`/dashboard?user=${uname}`);
  };

  return (
    <div className="min-h-screen  bg-black text-white flex flex-col items-center justify-center px-4">
      <input
        type="text"
        placeholder="Enter GitHub username or URL"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-4 w-full max-w-md bg-gray-800 text-white rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-4 py-2  rounded-2xl hover:bg-blue-600 transition"
      >
        Generate GitHub Card
      </button>
    </div>
  );
}
