import styles from './Card.module.scss'

type CardProps = {
  id: number
  title: string
}

const Card = ({ id, title }: CardProps) => {
  return (
    <a
      href={`/blog/${title.replaceAll(' ', '-').toLowerCase()}`}
      className={styles.card}
    >
      <img
        src={`https://picsum.photos/id/${id * 4}/400/400`}
        alt=""
        loading="lazy"
        className={styles.image}
      />
      <div className={styles.bg}></div>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.more}>続きを読む</p>
      </div>
    </a>
  )
}

export default Card
