'use client';

import { useState, useEffect } from 'react';
import styles from './ProjectGallery.module.css';

export default function ProjectGalleryAuto({ project }) {
  const [sections, setSections] = useState(project.sections);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null); // { src, alt, type: 'image' | 'video' }

  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedSections = await Promise.all(
          project.sections.map(async (section) => {
            const response = await fetch(
              `/api/images?projectId=${project.id}&sectionType=${section.type}`
            );
            const data = await response.json();
            return {
              ...section,
              images: data.images || []
            };
          })
        );
        setSections(updatedSections);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [project.id, project.sections]);

  // Закриття лайтбокса по Esc
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    if (lightbox) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  if (loading) {
    return <div className={styles.gallery}>Завантаження зображень...</div>;
  }

  return (
    <div className={styles.gallery}>
      {sections.map((section, index) => (
        <section key={index} className={styles.section}>
          <h3 className={styles.sectionTitle}>
            {section.name}
          </h3>

          {section.images && section.images.length > 0 ? (
            <div className={styles.galleryGrid}>
              {section.images.map((image, imgIndex) => {
                const src = `/images/${project.id}/${section.type}/${image}`;
                const lower = image.toLowerCase();
                const isVideo = lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov');
                const isPdf = lower.endsWith('.pdf');

                return (
                  <div
                    key={imgIndex}
                    className={`${styles.galleryItem} ${
                      section.type === 'stories' || section.type === 'reels' ? styles.storyFormat : styles.postFormat
                    }`}
                  >
                    {isVideo ? (
                      <div
                        onClick={() => setLightbox({ src, alt: image, type: 'video' })}
                        style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
                      >
                        <video
                          src={src}
                          muted
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000', pointerEvents: 'none' }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              width: '54px',
                              height: '54px',
                              borderRadius: '50%',
                              background: 'rgba(0, 0, 0, 0.55)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ color: 'white', fontSize: '1.4rem', marginLeft: '4px' }}>▶</span>
                          </div>
                        </div>
                      </div>
                    ) : isPdf ? (
                      <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          padding: '1rem',
                          textAlign: 'center',
                          color: '#374151',
                          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        }}
                      >
                        <span style={{ fontSize: '2rem' }}>📄</span>
                        <span style={{ fontSize: '0.85rem', wordBreak: 'break-word' }}>{image}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Відкрити PDF</span>
                      </a>
                    ) : (
                      <img
                        src={src}
                        alt={image}
                        onClick={() => setLightbox({ src, alt: image, type: 'image' })}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Зображення будуть додані пізніше</p>
            </div>
          )}
        </section>
      ))}

      {/* Лайтбокс */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Закрити"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
          {lightbox.type === 'video' ? (
            <video
              src={lightbox.src}
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '8px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4)',
                cursor: 'default',
              }}
            />
          ) : (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4)',
                cursor: 'default',
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}