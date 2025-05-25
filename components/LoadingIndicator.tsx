
import React from 'react';
import { SparklesIcon } from '../constants';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-start mb-4 px-4">
       <div className="flex items-start gap-2 max-w-xl">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-700">
         <SparklesIcon className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="px-4 py-3 rounded-lg shadow bg-slate-700 text-slate-200 rounded-bl-none">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-225"></div>
            <span className="ml-2 text-sm text-slate-400">Curve AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
