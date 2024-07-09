/* eslint-disable no-unused-vars */
import React from 'react';
import { requestToGroqAI } from '../utils/groq';
import { useState } from 'react';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Spinner } from 'flowbite-react';
import backgroundImage from '../assets/image-background.jpg';

const ChatAI = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const ai = await requestToGroqAI(document.getElementById('content').value);
    setData(ai);
    setLoading(false);
  };

  return (
    <div
      id="chatai"
      className="flex flex-col min-h-screen w-full px-4 sm:px-6 lg:px-8 bg-gray-100 font-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(241,245,249,0.5), rgba(241,245,249,0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col flex-1 w-full max-w-3xl mx-auto my-20 py-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-4xl text-sky-500 font-bold text-center mb-4">Chat AI Klinik Prima</h1>
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 rounded-md shadow-md mb-4 mx-4 max-h-96">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner aria-label="Loading" size="xl" />
            </div>
          ) : data ? (
            <SyntaxHighlight language="swift" style={duotoneLight} wrapLongLines={true}>
              {data.toString()}
            </SyntaxHighlight>
          ) : (
            <p className="text-gray-400 text-center">Belum ada percakapan.</p>
          )}
        </div>
        <form className="flex flex-col sm:flex-row gap-4 mx-4">
          <input placeholder="Ketikkan pertanyaan...!" name="content" id="content" type="text" className="flex-1 py-2 px-4 text-md rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatAI;
