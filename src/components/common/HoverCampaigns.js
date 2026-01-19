import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function HoverCampaigns({ ids, onSave }) {
  const list = Array.isArray(ids) ? ids : [];
  const count = list.length;

  const anchorRef = useRef(null);

  const [hoverOpen, setHoverOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, placeAbove: false });

  // ✅ 수정용 로컬 상태 (여기서 weight를 바꿈)
  const [draft, setDraft] = useState([]);

  // ids가 바뀌면 draft 동기화
  useEffect(() => {
    setDraft(list.map((x) => ({ ...x })));
  }, [ids]);

  const tipText = useMemo(() => {
    const preview = list.slice(0, 30);
    const more = count - preview.length;

    const lines = preview.map((x) => {
      const name = x?.campaignName ?? '-';
      return `${name}`;
    });

    if(more > 0) lines.push(`... +${more} more`);
    return lines.join('\n\n');
  }, [list, count]);

  const updatePosition = () => {
    const el = anchorRef.current;
    if(!el) return;

    const r = el.getBoundingClientRect();

    let top = r.bottom + 8;
    const left = r.left + r.width / 2;

    const estimatedHeight = Math.min(320, 18 * Math.min(count, 12) + 24);
    const placeAbove = (top + estimatedHeight) > window.innerHeight - 12;

    if(placeAbove) top = r.top - 8;

    setPos({ top, left, placeAbove });
  };

  useEffect(() => {
    if(!hoverOpen) return;

    updatePosition();

    const onScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [hoverOpen, count]);

  useEffect(() => {
    if(!modalOpen) return;

    const onKeyDown = (e) => {
      if(e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const changeWeight = (key, value) => {
    // key는 ci.id(네 객체의 id) 기준으로 업데이트하는게 안전
    setDraft((prev) =>
        prev.map((x) => {
          if(x?.id !== key) return x;
          return {
            ...x,
            weight: value === '' ? '' : Number(value)
          };
        })
    );
  };

  if(count === 0) return <span>-</span>;

  return (
      <>
			<span
          ref={anchorRef}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onMouseEnter={() => { if(!modalOpen) setHoverOpen(true); }}
          onMouseLeave={() => { setHoverOpen(false); }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHoverOpen(false);
            setModalOpen(true);
          }}
          title="클릭하면 상세 목록"
      >
				{count}개
			</span>

        {hoverOpen && !modalOpen && createPortal(
            <div
                onMouseEnter={() => setHoverOpen(true)}
                onMouseLeave={() => setHoverOpen(false)}
                style={{
                  position: 'fixed',
                  top: pos.top,
                  left: pos.left,
                  transform: pos.placeAbove ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
                  zIndex: 2147483647,
                  background: 'rgba(0,0,0,0.92)',
                  color: '#fff',
                  borderRadius: 10,
                  padding: '10px 12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                  maxWidth: 520,
                  maxHeight: 320,
                  overflow: 'auto',
                  whiteSpace: 'pre',
                  fontSize: 12,
                  lineHeight: '18px',
                }}
            >
              {tipText}
            </div>,
            document.body
        )}

        {modalOpen && createPortal(
            <div
                onClick={() => setModalOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  zIndex: 2147483647,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 16
                }}
            >
              <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 'min(900px, 96vw)',
                    maxHeight: '80vh',
                    background: '#fff',
                    color: '#000',
                    borderRadius: 12,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
              >
                <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid #ccc'}}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>
                    캠페인 가중치 설정 ({draft.length}/{count})
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                        onClick={() => {
                          if(typeof onSave === 'function') onSave(draft);
                          setModalOpen(false);
                        }}
                        style={{
                          height: 32,
                          padding: '0 10px',
                          borderRadius: 8,
                          border: '1px solid #333',
                          cursor: 'pointer'
                        }}
                    >
                      저장
                    </button>

                    <button
                        onClick={() => setModalOpen(false)}
                        style={{
                          height: 32,
                          padding: '0 10px',
                          borderRadius: 8,
                          border: '1px solid #333',
                          cursor: 'pointer'
                        }}
                    >
                      닫기
                    </button>
                  </div>
                </div>

                <div style={{ padding: 14, overflow: 'auto' }}>
                  {draft.length === 0 ? (
                      <div style={{ opacity: 0.7 }}>표시할 데이터가 없습니다.</div>
                  ) : (
                      <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 10 }}>
                        {draft.map((x, idx) => (
                            <li
                                key={`${x?.campaignId ?? 'no'}-${x?.id ?? idx}`}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
                            >
                              <div style={{ fontWeight: 700, flex: 1 }}>
                                {x?.campaignName ?? '-'}
                              </div>

                              <input
                                  type="number"
                                  value={x?.weight ?? ''}
                                  onChange={(e) => changeWeight(x?.id, e.target.value)}
                                  placeholder="가중치"
                                  style={{
                                    height: 32,
                                    padding: '0 10px',
                                    borderRadius: 8,
                                    border: '1px solid #333',
                                    outline: 'none',
                                    width: 120
                                  }}
                              />
                            </li>
                        ))}
                      </ul>
                  )}
                </div>
              </div>
            </div>,
            document.body
        )}
      </>
  );
}
