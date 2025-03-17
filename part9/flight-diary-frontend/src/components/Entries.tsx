import { Diary } from "../types"

interface EntriesProps {
    diaries: Diary[]
}

const Entries = ({ diaries }: EntriesProps) => {
    return (
        <>
            <h2>Diary entries</h2>
            <ul>
                {diaries.map((diary, index) =>
                <li key={index}>
                    <h3>{diary.date}</h3>
                    <p>{diary.visibility}</p>
                    <p>{diary.weather}</p>
                    <p>{diary.comment}</p>
                </li>)
                }
            </ul>
        </>
    )
}

export default Entries