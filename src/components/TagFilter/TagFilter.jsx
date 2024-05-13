// TagFilter.jsx
import React from 'react';
import * as s from './style';

const TagFilter = ({ tags, selectedTagId, onTagSelect }) => {
    return (
        <div css={s.tagContainer}>
            <button
                key="alltag"
                onClick={() => onTagSelect(null)}
                css={s.tagAllButton(selectedTagId === null)}
            >
                전체보기
            </button>
            {tags.map(tag => (
                <button
                    key={tag.value}
                    onClick={() => onTagSelect(tag.value)}
                    aria-pressed={selectedTagId === tag.value}
                    css={s.tagButton}
                >
                    {tag.label}
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
