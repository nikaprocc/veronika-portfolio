import styles from './page.module.css';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Вероніка Проців</h1>
            <p className={styles.subtitle}>SMM-менеджер • Content Creator</p>
            <p className={styles.description}>
              Енергійний та креативний SMM-менеджер із досвідом роботи з провідними брендами. 
              Я швидко адаптуюся до нових тенденцій, створюю захоплюючий контент та аналітично 
              підходжу до задач, забезпечуючи зростання впізнаваності бренду та збільшення продажів.
            </p>
            
            <div className={styles.contacts}>
              <a href="https://t.me/nikaproc" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span>Telegram</span>
                <span>→</span>
              </a>
              <a href="https://www.instagram.com/nikaproc?igsh=MWhvd3ZxeHMyYnFvaQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span>Instagram</span>
                <span>→</span>
              </a>
            </div>

            <div className={styles.skills}>
              <div className={styles.skillsGroup}>
                <h3>Hard Skills</h3>
                <div className={styles.skillsList}>
                  {['Photoshop', 'Illustrator', 'Figma', 'CapCut', 'Notion', 'Meta Business Suite', 'Google Tag Manager'].map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.skillsGroup}>
                <h3>Soft Skills</h3>
                <div className={styles.skillsList}>
                  {['Креативність', 'Адаптивність', 'Стратегічне мислення', 'Організованість', 'Аналітичні здібності'].map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className={styles.portfolio}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Портфоліо проектів</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}