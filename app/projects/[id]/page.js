'use client';

import Link from 'next/link';
import { projects } from '../../data/projects';
import ProjectGallery from '../../components/ProjectGallery';
import styles from './project.module.css';

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            ← Назад до портфоліо
          </Link>
          <div className={styles.notFound}>
            <h1>Проєкт не знайдено</h1>
            <p>Вибачте, але цей проєкт більше не доступний.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Назад до портфоліо
        </Link>

        {/* Project Header */}
        <div 
          className={styles.header}
          style={{ '--header-color': project.color }}
        >
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.category}>{project.category}</p>
          <p className={styles.description}>{project.description}</p>
          
          {project.services && project.services.length > 0 && (
            <div className={styles.services}>
              <h3>Послуги:</h3>
              <div className={styles.servicesList}>
                {project.services.map((service) => (
                  <span key={service} className={styles.serviceTag}>
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        <ProjectGallery project={project} />
      </div>
    </main>
  );
}