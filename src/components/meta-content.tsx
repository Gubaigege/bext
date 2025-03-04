import { RichEditor } from './rich-editor';
import { Meta } from '@/types';
import DOMPurify from 'dompurify';
import { FC, useMemo } from 'react';

export const MetaContent: FC<{ meta: Meta }> = ({ meta }) => {
  const cleanHtml = useMemo(
    () => DOMPurify.sanitize(meta.detail),
    [meta.detail],
  );
  return (
    <>
      <div className="text-lg font-bold">{meta.name}</div>
      <div className="mt-1 flex flex-wrap">
        {meta.tags.map((tag) => (
          <div
            key={tag}
            className="mt-1 border border-solid border-gray-200 px-1 rounded mr-1"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="mt-2">{meta.synopsis}</div>
      <div className="text-base font-semibold mt-4">详情</div>
      <div className="mt-2">
        <RichEditor key={cleanHtml} defaultHtml={cleanHtml} defaultReadOnly />
      </div>
    </>
  );
};
