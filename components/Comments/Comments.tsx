'use client';

import { useState } from 'react';
import { MessageSquare, Check, Trash2, Reply, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useAuth } from '@/components/AuthProvider';
import { useComments, type Comment } from './useComments';

interface CommentsProps {
  sectionId: string;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function CommentCard({
  comment,
  replies,
  onReply,
  onToggleResolved,
  onDelete,
  depth = 0,
}: {
  comment: Comment;
  replies: Comment[];
  onReply: (parentId: string) => void;
  onToggleResolved: (id: string) => void;
  onDelete: (id: string) => void;
  depth?: number;
}) {
  const { isDarkMode } = useTheme();
  const gold = '#c4a265';
  const muted = isDarkMode ? '#777' : '#888';
  const border = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div style={{ marginLeft: depth > 0 ? 20 : 0 }}>
      <div style={{
        padding: '0.6rem 0.75rem',
        background: comment.resolved
          ? (isDarkMode ? 'rgba(39,174,96,0.05)' : 'rgba(39,174,96,0.03)')
          : (isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'),
        border: `1px solid ${border}`,
        borderLeft: `2px solid ${comment.resolved ? '#27ae60' : gold}`,
        borderRadius: 6,
        marginBottom: '0.35rem',
        opacity: comment.resolved ? 0.7 : 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: gold }}>{comment.author}</span>
          <span style={{ fontSize: '0.6rem', color: muted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{comment.role}</span>
          <span style={{ fontSize: '0.6rem', color: muted, marginLeft: 'auto' }}>{timeAgo(comment.timestamp)}</span>
        </div>
        <p style={{
          fontSize: '0.8rem', color: isDarkMode ? '#ccc' : '#333',
          lineHeight: 1.5, margin: 0,
          textDecoration: comment.resolved ? 'line-through' : 'none',
        }}>
          {comment.text}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.35rem' }}>
          {depth === 0 && (
            <button onClick={() => onReply(comment.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: '0.65rem', color: muted, display: 'flex', alignItems: 'center', gap: 3,
            }}>
              <Reply size={10} /> Reply
            </button>
          )}
          <button onClick={() => onToggleResolved(comment.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '0.65rem', color: comment.resolved ? '#27ae60' : muted,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <Check size={10} /> {comment.resolved ? 'Unresolve' : 'Resolve'}
          </button>
          <button onClick={() => onDelete(comment.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '0.65rem', color: muted, display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <Trash2 size={10} /> Delete
          </button>
        </div>
      </div>
      {replies.map(r => (
        <CommentCard
          key={r.id}
          comment={r}
          replies={[]}
          onReply={onReply}
          onToggleResolved={onToggleResolved}
          onDelete={onDelete}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export default function Comments({ sectionId }: CommentsProps) {
  const { isDarkMode } = useTheme();
  const { roleLabel, userName } = useAuth();
  const { comments, getReplies, addComment, toggleResolved, deleteComment } = useComments(sectionId);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const gold = '#c4a265';
  const muted = isDarkMode ? '#777' : '#888';
  const border = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addComment(trimmed, userName || roleLabel || 'Anonymous', roleLabel || 'user', replyTo || undefined);
    setText('');
    setReplyTo(null);
  };

  const unresolvedCount = comments.filter(c => !c.resolved).length;

  return (
    <div style={{
      marginTop: '1rem', padding: '0.75rem',
      background: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${border}`, borderRadius: 8,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        <MessageSquare size={14} style={{ color: gold }} />
        <span style={{ fontSize: '0.75rem', color: gold, fontWeight: 600, letterSpacing: '0.05em' }}>
          COMMENTS {unresolvedCount > 0 ? `(${unresolvedCount})` : ''}
        </span>
        {isOpen
          ? <ChevronDown size={12} style={{ color: muted, marginLeft: 'auto' }} />
          : <ChevronRight size={12} style={{ color: muted, marginLeft: 'auto' }} />
        }
      </button>

      {isOpen && (
        <div style={{ marginTop: '0.75rem' }}>
          {comments.length === 0 && (
            <p style={{ fontSize: '0.75rem', color: muted, textAlign: 'center', padding: '0.5rem 0' }}>
              No comments yet
            </p>
          )}

          {comments.map(c => (
            <CommentCard
              key={c.id}
              comment={c}
              replies={getReplies(c.id)}
              onReply={(id) => setReplyTo(id)}
              onToggleResolved={toggleResolved}
              onDelete={deleteComment}
            />
          ))}

          {/* Input */}
          <div style={{ marginTop: '0.5rem' }}>
            {replyTo && (
              <div style={{ fontSize: '0.7rem', color: gold, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Reply size={10} /> Replying to thread
                <button onClick={() => setReplyTo(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: muted, fontSize: '0.65rem' }}>
                  (cancel)
                </button>
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Add a comment..."
                style={{
                  flex: 1, padding: '0.4rem 0.6rem', fontSize: '0.8rem',
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${border}`, borderRadius: 4, outline: 'none',
                  color: isDarkMode ? '#e0e0e0' : '#333',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                style={{
                  padding: '0.4rem 0.75rem', fontSize: '0.75rem', fontWeight: 600,
                  background: text.trim() ? `${gold}20` : 'transparent',
                  border: `1px solid ${text.trim() ? gold : border}`,
                  borderRadius: 4, cursor: text.trim() ? 'pointer' : 'default',
                  color: text.trim() ? gold : muted,
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
