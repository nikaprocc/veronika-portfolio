'use client';

import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div 
        className={styles.card}
        style={{ '--card-color': project.color }}
      >
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.category}>{project.category}</p>
          <p className={styles.services}>
            {project.services.slice(0, 2).join(', ')}
          </p>
        </div>
        <div className={styles.arrow}>→</div>
      </div>
    </Link>
  );
}