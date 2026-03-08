'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.scss';

interface AccordionItemProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function AccordionItem({ title, defaultOpen = false, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.item} data-state={isOpen ? 'open' : 'closed'}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <span className={styles.triggerText}>{title}</span>
        <ChevronDown
          size={16}
          className={styles.chevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        className={styles.content}
        style={{
          maxHeight: isOpen ? '5000px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
        role="region"
      >
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
