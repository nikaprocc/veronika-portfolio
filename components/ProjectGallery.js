'use client';

import { useState } from 'react';
import styles from './ProjectGallery.module.css';

export default function ProjectGallery({ project }) {
  const [expandedSection, setExpandedSection] = useState(0);

  return (
    <div className={styles.gallery}>
      {project.sections.map((section, index) => (
        <section key={index} className={styles.section}>
          <h3 className={styles.sectionTitle}>
            {section.name}
          </h3>
          
          {section.images && section.images.length > 0 ? (
            <div className={styles.galleryGrid}>
              {section.images.map((image, imgIndex) => (
                <div 
                  key={imgIndex} 
                  className={`${styles.galleryItem} ${
                    section.type === 'stories' ? styles.storyFormat : styles.postFormat
                  }`}
                >
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>{image}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Зображення будуть додані пізніше</p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}