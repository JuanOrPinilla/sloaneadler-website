'use client';

import React, { ElementType } from 'react';

export interface StrapiBlockChild {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiBlockChild[];
}

export interface StrapiBlock {
  type: string;
  children?: StrapiBlockChild[];
  level?: number;
  format?: 'ordered' | 'unordered';
  url?: string;
}

interface StrapiBlocksRendererProps {
  content: StrapiBlock[];
}

// Helper to render inline text with modifiers
const renderInline = (children: StrapiBlockChild[]): React.ReactNode => {
  return children.map((child, index) => {
    if (child.type === 'text') {
      let text: React.ReactNode = child.text || '';
      
      if (child.bold) {
        text = <strong key={index} className="font-bold">{text}</strong>;
      }
      if (child.italic) {
        text = <em key={index} className="italic">{text}</em>;
      }
      if (child.underline) {
        text = <u key={index} className="underline">{text}</u>;
      }
      if (child.strikethrough) {
        text = <del key={index} className="line-through">{text}</del>;
      }
      if (child.code) {
        text = <code key={index} className="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">{text}</code>;
      }
      
      return <React.Fragment key={index}>{text}</React.Fragment>;
    }
    
    if (child.type === 'link' && child.children) {
      const url = child.url || '#';
      return (
        <a
          key={index}
          href={url}
          className="text-[#b8a07e] hover:underline"
          target={url.startsWith('http') ? '_blank' : undefined}
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {renderInline(child.children)}
        </a>
      );
    }
    
    return null;
  });
};

// Render a single block
const renderBlock = (block: StrapiBlock, index: number): React.ReactNode => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-lg mb-6 text-slate-700 leading-relaxed">
          {block.children && renderInline(block.children)}
        </p>
      );
    
    case 'heading': {
      const level = block.level || 2;
      const className = `font-serif font-bold mb-6 mt-8 text-slate-800 ${
        level === 1 ? 'text-4xl' :
        level === 2 ? 'text-3xl' :
        level === 3 ? 'text-2xl' :
        level === 4 ? 'text-xl' : 'text-lg'
      }`;
      
      const content = block.children && renderInline(block.children);
      const levelNum = level as 1 | 2 | 3 | 4 | 5 | 6;
      
      switch (levelNum) {
        case 1:
          return <h1 key={index} className={className}>{content}</h1>;
        case 2:
          return <h2 key={index} className={className}>{content}</h2>;
        case 3:
          return <h3 key={index} className={className}>{content}</h3>;
        case 4:
          return <h4 key={index} className={className}>{content}</h4>;
        case 5:
          return <h5 key={index} className={className}>{content}</h5>;
        case 6:
          return <h6 key={index} className={className}>{content}</h6>;
        default:
          return <h2 key={index} className={className}>{content}</h2>;
      }
    }
    
    case 'list': {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const listClassName = `mb-6 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'} pl-6 text-slate-700`;
      return (
        <ListTag key={index} className={listClassName}>
          {block.children?.map((item, itemIndex) => (
            <li key={itemIndex} className="mb-2">
              {item.children && renderInline(item.children)}
            </li>
          ))}
        </ListTag>
      );
    }
    
    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-[#b8a07e] pl-6 italic my-8 text-slate-600 text-lg">
          {block.children && renderInline(block.children)}
        </blockquote>
      );
    
    case 'code':
      return (
        <pre key={index} className="bg-slate-100 p-4 rounded-lg overflow-x-auto mb-6">
          <code className="text-sm font-mono text-slate-800">
            {block.children?.map((child) => child.text).join('')}
          </code>
        </pre>
      );
    
    case 'image':
      return null; // Images are handled separately
    
    default:
      return null;
  }
};

export const StrapiBlocksRenderer: React.FC<StrapiBlocksRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="strapi-blocks-content">
      {content.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default StrapiBlocksRenderer;
