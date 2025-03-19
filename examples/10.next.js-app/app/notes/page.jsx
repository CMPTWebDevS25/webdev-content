import Link from 'next/link'
import styles from './Notes.module.css'
import CreateNote from './CreateNote'
import fs from 'fs'
import path from 'path'

const getNotes = async () => {
  const filePath = path.join(process.cwd(), 'data', 'db.json')
  const jsonData = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(jsonData)
  return data.notes
}

export default async function NotesPage() {
  const notes = await getNotes()
  console.log(notes)

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes && notes?.map((note) => {
          return <Note key={note.id} note={note} />
        })}
      </div>

      <CreateNote />
    </div>
  )
}

function Note({ note }) {
  const { id, title, content } = note // || {}

  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
      </div>
    </Link>
  )
}
