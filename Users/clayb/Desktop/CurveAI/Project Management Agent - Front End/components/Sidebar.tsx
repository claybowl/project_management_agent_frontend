
import React, { useState } from 'react';
import { XMarkIcon, CogIcon, LightBulbIcon, ChatBubbleLeftRightIcon, DocumentTextIcon } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarNavItem: React.FC<{icon: React.ReactNode, text: string, onClick?: () => void}> = ({icon, text, onClick}) => (
  <button
    onClick={onClick}
    className="flex items-center w-full px-3 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-indigo-400 rounded-md transition-colors duration-150"
  >
    <span className="mr-3">{icon}</span>
    {text}
  </button>
);


const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackText.trim()) {
      alert(`Feedback submitted: "${feedbackText}"\n(This is a demo, feedback is not actually sent.)`);
      setFeedbackText('');
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-800 border-r border-slate-700 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-indigo-400">Curve AI</h2>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700 transition-colors"
          aria-label="Close sidebar"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        <SidebarNavItem icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} text="Recent Conversations" onClick={() => alert("Feature: Recent Conversations (Not Implemented)")} />
        <SidebarNavItem icon={<LightBulbIcon className="w-5 h-5" />} text="Saved Insights" onClick={() => alert("Feature: Saved Insights (Not Implemented)")}/>
        <SidebarNavItem icon={<DocumentTextIcon className="w-5 h-5" />} text="Tasks & Reminders" onClick={() => alert("Feature: Tasks & Reminders (Not Implemented)")}/>
        <SidebarNavItem icon={<CogIcon className="w-5 h-5" />} text="Settings" onClick={() => alert("Feature: Settings (Not Implemented)")}/>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <h3 className="text-sm font-semibold text-slate-400 mb-2">Provide Feedback</h3>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Your thoughts on Curve AI..."
            rows={3}
            className="w-full p-2 text-sm bg-slate-700 text-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-500"
          />
          <button
            type="submit"
            className="mt-2 w-full px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-colors duration-150 disabled:opacity-50"
            disabled={!feedbackText.trim()}
          >
            Send Feedback
          </button>
        </form>
      </div>
      <div className="p-4 text-center text-xs text-slate-500 border-t border-slate-700">
        Curve AI v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
