import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { sendMessage, listenToMessages } from '../firebase/messages'
import { getBrandById } from '../firebase/brands'

export default function ChatPage() {
  const { applicationId, brandId, otherName } = useParams()
  const { user } = useAuth()
  const nav = useNavigate()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [brandName, setBrandName] = useState(decodeURIComponent(otherName || ''))
  const bottomRef = useRef(null)

  useEffect(() => {
    if (brandId) {
      getBrandById(brandId).then(b => { if (b) setBrandName(b.name) })
    }
  }, [brandId])

  useEffect(() => {
    if (!applicationId) return
    const unsub = listenToMessages(applicationId, (msgs) => {
      setMessages(msgs)
    })
    return unsub
  }, [applicationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!text.trim() || sending) return
    setSending(true)
    try {
      await sendMessage(applicationId, user.uid, user.email, text.trim())
      setText('')
    } catch (e) {
      console.error(e)
    }
    setSending(false)
  }

  const groupedMessages = messages.reduce((groups, msg) => {
    const date = new Date(msg.createdAt).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(msg)
    return groups
  }, {})

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: 'calc(100vh - 60px)',
      maxWidth: 700, margin: '0 auto',
      background: '#0d0d14'
    }}>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #1e1e2e',
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#0d0d14', flexShrink: 0
      }}>
        <button
          onClick={() => nav(-1)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 20, color: '#555', padding: '4px 8px',
            borderRadius: 8, lineHeight: 1
          }}>
          ←
        </button>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#ede9ff', color: '#5b4fcf',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, fontSize: 16, flexShrink: 0
        }}>
          {brandName?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: '#e8e8f0' }}>{brandName}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a9e6e' }} />
            <p style={{ fontSize: 12, color: '#1a9e6e', margin: 0 }}>Partnership approved</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '20px 16px',
        background: '#0a0a0f',
        display: 'flex', flexDirection: 'column', gap: 4
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
            <p style={{ color: '#aaa', fontSize: 14 }}>No messages yet. Say hello!</p>
          </div>
        )}

        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date separator */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              margin: '16px 0 12px'
            }}>
              <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
              <span style={{
                fontSize: 11, color: '#555', fontWeight: 500,
                padding: '3px 10px', background: '#1a1a2e',
                borderRadius: 20, flexShrink: 0
              }}>{date}</span>
              <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
            </div>

            {/* Messages for this date */}
            {msgs.map((msg, i) => {
              const isMe = msg.senderId === user.uid
              const prevMsg = msgs[i - 1]
              const showSender = !prevMsg || prevMsg.senderId !== msg.senderId

              return (
                <div key={msg.id} style={{
                  display: 'flex',
                  flexDirection: isMe ? 'row-reverse' : 'row',
                  alignItems: 'flex-end',
                  gap: 8,
                  marginBottom: 4,
                  marginTop: showSender && i > 0 ? 12 : 0
                }}>
                  {/* Avatar — only show for first message in a group */}
                  <div style={{ width: 28, flexShrink: 0 }}>
                    {showSender && !isMe && (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: '#ede9ff', color: '#5b4fcf',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 600
                      }}>
                        {msg.senderName?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                  </div>

                  <div style={{ maxWidth: '68%' }}>
                    {/* Sender name */}
                    {showSender && !isMe && (
                      <p style={{ fontSize: 11, color: '#aaa', margin: '0 0 3px 4px' }}>
                        {msg.senderName?.split('@')[0]}
                      </p>
                    )}

                    {/* Bubble */}
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: isMe
                        ? (showSender ? '18px 18px 4px 18px' : '18px 4px 4px 18px')
                        : (showSender ? '18px 18px 18px 4px' : '4px 18px 18px 4px'),
                      background: isMe ? '#5b4fcf' : '#111118',
                      color: isMe ? 'white' : '#e8e8f0',
                      fontSize: 14, lineHeight: 1.5,
                      border: isMe ? 'none' : '1px solid #1e1e2e',
                      wordBreak: 'break-word'
                    }}>
                      <p style={{ margin: 0 }}>{msg.text}</p>
                      <p style={{
                        margin: '3px 0 0', fontSize: 10,
                        opacity: 0.6, textAlign: 'right'
                      }}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid #1e1e2e',
        background: '#0d0d14',
        display: 'flex', gap: 10, alignItems: 'center',
        flexShrink: 0
      }}>
        <input
          style={{
            flex: 1, padding: '12px 16px',
            border: '1.5px solid #1e1e2e', borderRadius: 24,
            fontSize: 14, outline: 'none',
            fontFamily: 'Inter, sans-serif',
            background: '#111118',
            color: '#e8e8f0',
            transition: 'border-color 0.15s'
          }}
          placeholder="Type a message…"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          onFocus={e => e.target.style.borderColor = '#5b4fcf'}
          onBlur={e => e.target.style.borderColor = '#1e1e2e'}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || sending}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: text.trim() ? '#5b4fcf' : '#1e1e2e',
            border: 'none', cursor: text.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s', flexShrink: 0
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}