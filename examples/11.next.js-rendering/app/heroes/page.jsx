import { headers } from "next/headers"

export default async function Page() {
    const headersList = await headers()
    console.log("Headers: ", headersList.get('user-agent'))
    const data = await fetch('http://localhost:8080/api/heroes')
    const heroes = await data.json()
    console.log("Heroes count: ", heroes.length)
    return (
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    )
  }