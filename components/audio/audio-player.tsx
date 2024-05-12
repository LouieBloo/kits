import React from 'react';
import { PiDownloadSimpleFill } from "react-icons/pi";

export default function AudioPlayer  ({ url }) {

  return (
    <div className="flex items-center space-x-4">
      <audio controls className="flex-grow">
        <source src={url} type="audio/mpeg" />
      </audio>

      <a href={url} download className="border-solid border-2 rounded p-2">
        <PiDownloadSimpleFill/>
      </a>
    </div>
  );
  
}
