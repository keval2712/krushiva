'use client';

import { useState } from 'react';

const mockConversations = [
  { id: '1', name: 'Ravi Kumar (Farmer)', lastMsg: 'I have stacked the bags. Let me know once driver arrives.', date: '12m ago', active: true },
  { id: '2', name: 'Metro Mart (Buyer Representative)', lastMsg: 'Please verify the crop weight on dispatch.', date: '1h ago', active: false },
];

export default function TransporterChatPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeId, setActiveId] = useState('1');
  const [messages, setMessages] = useState([
    { sender: 'Ravi Kumar', text: 'Hello, what vehicle is assigned for order ORD-029?', time: '10:30 AM' },
    { sender: 'Me', text: 'Hello Ravi, we have assigned Tata Ace (DL-1GC-1234) driven by Manpreet.', time: '10:32 AM' },
    { sender: 'Ravi Kumar', text: 'I have stacked the bags. Let me know once driver arrives.', time: '10:35 AM' },
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages([...messages, { sender: 'Me', text: newMsg, time: 'Just now' }]);
    setNewMsg('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', height: 'calc(100vh - 120px)', gap: 'var(--space-4)', padding: 'var(--space-4)' }}>
      {/* Left List */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header">
          <h2 className="card-title" style={{ fontSize: 'var(--text-md)' }}>Conversations</h2>
        </div>
        <div className="card-body" style={{ flex: 1, overflowY: 'auto', padding: 0 }}>
          {conversations.map(c => (
            <div
              key={c.id}
              onClick={() => setActiveId(c.id)}
              style={{
                padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', cursor: 'pointer',
                background: c.id === activeId ? 'rgba(30, 64, 175, 0.05)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: 'var(--text-sm)' }}>{c.name}</strong>
                <span style={{ fontSize: 'var(--text-xxs)', color: 'var(--color-text-muted)' }}>{c.date}</span>
              </div>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.lastMsg}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header">
          <h2 className="card-title" style={{ fontSize: 'var(--text-md)' }}>
            {conversations.find(c => c.id === activeId)?.name || 'Select Conversation'}
          </h2>
        </div>
        <div className="card-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4)' }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.sender === 'Me' ? 'flex-end' : 'flex-start',
                background: m.sender === 'Me' ? '#1e40af' : 'var(--color-surface-2)',
                color: m.sender === 'Me' ? 'white' : 'var(--color-text)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '70%',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', marginBottom: '2px', color: m.sender === 'Me' ? 'rgba(255,255,255,0.7)' : 'var(--color-primary)' }}>
                {m.sender}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', wordBreak: 'break-word' }}>{m.text}</div>
              <div style={{ fontSize: 'var(--text-xxs)', color: m.sender === 'Me' ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)', textAlign: 'right', marginTop: '4px' }}>
                {m.time}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ display: 'flex', padding: 'var(--space-4)', borderTop: '1px solid var(--color-border)', gap: 'var(--space-3)' }}>
          <input
            type="text"
            className="input"
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
}
