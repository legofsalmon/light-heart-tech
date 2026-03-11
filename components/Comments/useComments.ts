'use client';

import { useState, useCallback, useEffect } from 'react';

export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  timestamp: number;
  resolved: boolean;
  parentId?: string;
}

const STORAGE_PREFIX = 'lightheart_comments_';

function getKey(sectionId: string) {
  return `${STORAGE_PREFIX}${sectionId}`;
}

export function useComments(sectionId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(getKey(sectionId));
      if (stored) setComments(JSON.parse(stored));
    } catch { /* ignore */ }
  }, [sectionId]);

  const persist = useCallback((next: Comment[]) => {
    setComments(next);
    try {
      localStorage.setItem(getKey(sectionId), JSON.stringify(next));
    } catch { /* ignore */ }
  }, [sectionId]);

  const addComment = useCallback((text: string, author: string, role: string, parentId?: string) => {
    const comment: Comment = {
      id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author,
      role,
      text,
      timestamp: Date.now(),
      resolved: false,
      parentId,
    };
    persist([...comments, comment]);
  }, [comments, persist]);

  const toggleResolved = useCallback((id: string) => {
    persist(comments.map(c => c.id === id ? { ...c, resolved: !c.resolved } : c));
  }, [comments, persist]);

  const deleteComment = useCallback((id: string) => {
    persist(comments.filter(c => c.id !== id && c.parentId !== id));
  }, [comments, persist]);

  const topLevel = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  return { comments: topLevel, getReplies, addComment, toggleResolved, deleteComment };
}
