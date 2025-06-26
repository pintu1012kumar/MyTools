'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchGitHubData } from '@/utils/fetchGitHubData';
import GitHubCalendar from 'react-github-calendar';
import { FaGithub, FaXTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import { toPng } from 'html-to-image';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const username = searchParams.get('user') || '';
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;
      try {
        const data = await fetchGitHubData(username);
        setUserData(data);
        setError('');
      } catch {
        setError('User not found.');
        setUserData(null);
      }
    };

    fetchData();
  }, [username]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current);
      const link = document.createElement('a');
      link.download = `${userData.login}_github_card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userData && (
        <>
          <div
            ref={cardRef}
            className="relative mt-10 p-6 w-full max-w-sm rounded-2xl text-center bg-[#0a0a0a] border border-gray-700 shadow-lg overflow-hidden"
          >
            {/* Glowing Gradient at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-700/30 to-transparent pointer-events-none" />

            {/* Avatar */}
            <img
              src={userData.avatar_url}
              alt="avatar"
              className="rounded-full w-20 mx-auto ring-2 ring-white/10"
            />
            <h2 className="text-xl font-semibold mt-4">
              {userData.name || userData.login}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{userData.bio}</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mt-4 text-xl text-white">
              <a href={userData.html_url} target="_blank"><FaGithub /></a>
              {userData.twitter_username && (
                <a href={`https://x.com/${userData.twitter_username}`} target="_blank">
                  <FaXTwitter />
                </a>
              )}
              <a href={`https://linkedin.com/in/${userData.twitter_username}`} target="_blank">
                <FaLinkedin />
              </a>
              {userData.email && (
                <a href={`mailto:${userData.email}`}>
                  <FaEnvelope />
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center mt-6 px-4 text-sm text-gray-300">
              <div className="text-center">
                <p className="text-white font-medium">{userData.followers}</p>
                <p>Followers</p>
              </div>
              <div className="text-center">
                <p className="text-white font-medium">{userData.following}</p>
                <p>Following</p>
              </div>
              <div className="text-center">
                <p className="text-white font-medium">{userData.public_repos}</p>
                <p>Repositories</p>
              </div>
            </div>

            {/* Calendar */}
            <div className="mt-6 w-[340px] sm:w-[400px] mx-auto overflow-hidden">
              <GitHubCalendar
                username={userData.login}
                colorScheme="dark"
                blockSize={5}
                blockMargin={2}
                fontSize={10}
                showWeekdayLabels={false}
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 bg-blue-600 px-4 py-2  hover:bg-blue-500 transition rounded-4xl"
          >
            Download as Image
          </button>
        </>
      )}
    </div>
  );
}
