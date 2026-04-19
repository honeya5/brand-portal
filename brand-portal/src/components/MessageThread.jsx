import { useEffect, useState, useRef } from 'react'
import { sendMessage, listenToMessages } from '../firebase/messages'
import { useAuth } from '../hooks/useAuth'

export default function MessageThread({ applicationId, otherPersonName, isApproved }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!applicationId) return
    const unsub = listenToMessages(applicationId, setMessages)
    return unsub
  }, [applicationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!text.trim()) return
    setSending(true)
    await sendMessage(applicationId, user.uid, user.email, text.trim())
    setText('')
    setSending(false)
  }

  if (!isApproved) return (
    <div style={{
      padding: '20px', textAlign: 'center',
      background: '#f8f7f4', borderRadius: 10,
      border: '1px dashed #e8e6e0'
    }}>
      <p style={{ color: '#aaa', fontSize: 13, margin: 0 }}>
        Messaging unlocks after the application is approved
      </p>
    </div>
  )

  return (
    <div style={{
      border: '1px solid #e8e6e0',
      borderRadius: 14,
      background: '#fff',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid #e8e6e0',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#1a9e6e'
        }} />
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
          Chat with {otherPersonName}
        </p>
      </div>

      {/* Messages */}
      <div style={{
        height: 280,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        {messages.length === 0 && (
          <p style={{ color: '#ccc', fontSize: 13, textAlign: 'center', marginTop: 80 }}>
            No messages yet. Say hello!
          </p>
        )}
        {messages.map(msg => {
          const isMe = msg.senderId === user.uid
          return (
            <div key={msg.id} style={{
              display: 'flex',
              justifyContent: isMe ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '72%',
                padding: '10px 14px',
                borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: isMe ? '#5b4fcf' : '#f0eeea',
                color: isMe ? 'white' : '#1a1a1a',
                fontSize: 14,
                lineHeight: 1.5
              }}>
                <p style={{ margin: 0 }}>{msg.text}</p>
                <p style={{
                  margin: '4px 0 0',
                  fontSize: 10,
                  opacity: 0.6,
                  textAlign: 'right'
                }}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #e8e6e0',
        display: 'flex', gap: 8
      }}>
        <input
          className="input"
          style={{ flex: 1 }}
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
        />
        <button
          className="btn btn-primary"
          onClick={handleSend}
          disabled={!text.trim() || sending}
          style={{ padding: '10px 18px', flexShrink: 0 }}
        >
          {sending ? '…' : 'Send'}
        </button>
      </div>
    </div>
  )
}