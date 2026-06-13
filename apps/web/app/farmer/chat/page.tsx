'use client';

import { useState, useRef, useEffect } from 'react';

type MessageType = 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';

interface Message {
  id: string;
  content: string;
  type: MessageType;
  senderId: string;
  senderName: string;
  timestamp: string;
  isMine: boolean;
}

interface Conversation {
  id: string;
  otherUser: { name: string; role: string; avatar: string; trustScore: number; online: boolean };
  orderId?: string;
  orderNumber?: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  { id: 'c1', otherUser: { name: 'Mehul Trading Co.', role: 'Buyer', avatar: 'M', trustScore: 88, online: true }, orderId: 'ORD-001', orderNumber: 'ORD-2024-001', lastMessage: 'Can you confirm the dispatch date?', lastTime: '10m', unread: 2 },
  { id: 'c2', otherUser: { name: 'Ajay Transport', role: 'Transporter', avatar: 'A', trustScore: 91, online: true }, orderId: 'ORD-001', orderNumber: 'ORD-2024-001', lastMessage: 'Truck will arrive by 6 AM', lastTime: '25m', unread: 1 },
  { id: 'c3', otherUser: { name: 'City Wholesalers', role: 'Buyer', avatar: 'C', trustScore: 84, online: false }, orderId: 'ORD-003', orderNumber: 'ORD-2024-003', lastMessage: 'Thank you, quality was excellent!', lastTime: '2h', unread: 0 },
  { id: 'c4', otherUser: { name: 'Fresh Direct', role: 'Buyer', avatar: 'F', trustScore: 79, online: false }, orderId: 'ORD-002', orderNumber: 'ORD-2024-002', lastMessage: 'What is the current price for tomato?', lastTime: '1d', unread: 3 },
];

const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', content: 'Hello, I\'m interested in your Wheat Grade A listing. Is it still available?', type: 'TEXT', senderId: 'buyer1', senderName: 'Mehul Trading', timestamp: '10:00', isMine: false },
    { id: 'm2', content: 'Yes, it\'s available! I have 50 quintals ready. What quantity do you need?', type: 'TEXT', senderId: 'me', senderName: 'Ravi Kumar', timestamp: '10:02', isMine: true },
    { id: 'm3', content: 'I need 10 quintals for now. What\'s your best price?', type: 'TEXT', senderId: 'buyer1', senderName: 'Mehul Trading', timestamp: '10:05', isMine: false },
    { id: 'm4', content: 'For 10 quintal, I can offer ₹2,400/quintal. That\'s ₹24,000 total. I can dispatch within 2 days.', type: 'TEXT', senderId: 'me', senderName: 'Ravi Kumar', timestamp: '10:07', isMine: true },
    { id: 'm5', content: 'That sounds fair. Can you share the quality certificate?', type: 'TEXT', senderId: 'buyer1', senderName: 'Mehul Trading', timestamp: '10:10', isMine: false },
    { id: 'm6', content: 'Sure, I\'ll share the lab report. The wheat is Grade A, moisture content 12%, clean and properly stored.', type: 'TEXT', senderId: 'me', senderName: 'Ravi Kumar', timestamp: '10:12', isMine: true },
    { id: 'm7', content: 'Great! Please create the order and I\'ll confirm. Can you confirm the dispatch date?', type: 'TEXT', senderId: 'buyer1', senderName: 'Mehul Trading', timestamp: '10:45', isMine: false },
  ],
  c2: [
    { id: 'm1', content: 'Hi, I\'ve been assigned to transport your order ORD-2024-001. When can I come for pickup?', type: 'TEXT', senderId: 'transport1', senderName: 'Ajay Transport', timestamp: '08:00', isMine: false },
    { id: 'm2', content: 'The produce will be ready by tomorrow morning at 6 AM. Can you come then?', type: 'TEXT', senderId: 'me', senderName: 'Ravi Kumar', timestamp: '08:05', isMine: true },
    { id: 'm3', content: 'Truck will arrive by 6 AM', type: 'TEXT', senderId: 'transport1', senderName: 'Ajay Transport', timestamp: '08:07', isMine: false },
  ],
};

export default function FarmerChatPage() {
  const [activeConv, setActiveConv] = useState<string>('c1');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find(c => c.id === activeConv);
  const currentMessages = messages[activeConv] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv, messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    const msg: Message = {
      id: `m${Date.now()}`,
      content: newMessage.trim(),
      type: 'TEXT',
      senderId: 'me',
      senderName: 'Ravi Kumar',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    setMessages(prev => ({ ...prev, [activeConv]: [...(prev[activeConv] || []), msg] }));
    setNewMessage('');
    setSending(false);
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden', margin: 'calc(-1 * var(--space-8))', borderRadius: 'var(--radius-xl)' }}>
      {/* Conversation List */}
      <div style={{ width: 320, background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: 'var(--space-4) var(--space-4) var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-3)' }}>Messages</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>🔍</span>
            <input placeholder="Search conversations..." style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: 'var(--text-sm)' }} id="chat-search" />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {mockConversations.map((conv) => (
            <div
              key={conv.id}
              id={`conv-${conv.id}`}
              onClick={() => setActiveConv(conv.id)}
              style={{
                display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)',
                cursor: 'pointer',
                background: activeConv === conv.id ? 'var(--color-primary-50)' : 'transparent',
                borderLeft: activeConv === conv.id ? '3px solid var(--color-primary)' : '3px solid transparent',
                transition: 'all 150ms',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div className="avatar avatar-md" style={{ background: 'var(--color-primary)', color: 'white' }}>
                  {conv.otherUser.avatar}
                </div>
                {conv.otherUser.online && (
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--color-success)', border: '2px solid white' }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <span style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.otherUser.name}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexShrink: 0, marginLeft: 'var(--space-2)' }}>{conv.lastTime}</span>
                </div>
                {conv.orderNumber && (
                  <div style={{ fontSize: 10, color: 'var(--color-primary)', fontWeight: 'var(--font-medium)', marginBottom: 2 }}>{conv.orderNumber}</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {conv.lastMessage}
                  </span>
                  {conv.unread > 0 && (
                    <span style={{ flexShrink: 0, marginLeft: 'var(--space-2)', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', fontSize: 10, fontWeight: 'bold', padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-background)', minWidth: 0 }}>
        {/* Header */}
        {conversation && (
          <div style={{ padding: 'var(--space-4) var(--space-6)', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ position: 'relative' }}>
              <div className="avatar avatar-md" style={{ background: 'var(--color-primary)', color: 'white' }}>
                {conversation.otherUser.avatar}
              </div>
              {conversation.otherUser.online && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: 'var(--color-success)', border: '2px solid white' }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{conversation.otherUser.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', gap: 'var(--space-3)' }}>
                <span>{conversation.otherUser.role}</span>
                <span>Trust: {conversation.otherUser.trustScore}</span>
                <span style={{ color: conversation.otherUser.online ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                  {conversation.otherUser.online ? '● Online' : '○ Offline'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {conversation.orderId && (
                <a href={`/farmer/orders/${conversation.orderId}`} className="btn btn-outline btn-sm">
                  View Order
                </a>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {currentMessages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.isMine ? 'flex-end' : 'flex-start' }}>
              {!msg.isMine && (
                <div className="avatar avatar-sm" style={{ background: 'var(--color-primary)', color: 'white', marginRight: 'var(--space-2)', alignSelf: 'flex-end', flexShrink: 0 }}>
                  {msg.senderName.charAt(0)}
                </div>
              )}
              <div style={{ maxWidth: '65%' }}>
                <div style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: msg.isMine ? 'var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg)' : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm)',
                  background: msg.isMine ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: msg.isMine ? 'white' : 'var(--color-text)',
                  border: msg.isMine ? 'none' : '1px solid var(--color-border)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.5,
                }}>
                  {msg.content}
                </div>
                <div style={{ fontSize: 10, color: 'var(--color-text-muted)', marginTop: 4, textAlign: msg.isMine ? 'right' : 'left' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: 'var(--space-4) var(--space-6)', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)' }}>
          <div style={{ flex: 1, background: 'var(--color-surface-2)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: 'var(--space-3) var(--space-4)', display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)' }}>
            <textarea
              id="chat-input"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message... (Enter to send)"
              rows={1}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', fontSize: 'var(--text-sm)', color: 'var(--color-text)', maxHeight: 120, lineHeight: 1.5 }}
            />
          </div>
          <button
            id="btn-send-message"
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: newMessage.trim() ? 'var(--color-primary)' : 'var(--color-surface-3)',
              color: newMessage.trim() ? 'white' : 'var(--color-text-muted)',
              border: 'none', cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 200ms', flexShrink: 0,
              fontSize: 18,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
