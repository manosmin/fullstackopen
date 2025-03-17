import { useState } from "react";
import diaryService from '../services/diaries'
import { Diary } from "../types";

interface FormProps {
    diaries: Diary[],
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const Form = ({ diaries, setDiaries }: FormProps) => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        diaryService.createNew({ date, weather, visibility, comment }).then(response => setDiaries(diaries.concat(response)));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date </label>
                <input value={date} onChange={(e) => setDate(e.target.value)}></input>
            </div>
            <div>
                <label>Visibility </label>
                <input value={visibility} onChange={(e) => setVisibility(e.target.value)}></input>
            </div>
            <div>
                <label>Weather </label>
                <input value={weather} onChange={(e) => setWeather(e.target.value)}></input>
            </div>
            <div>
                <label>Comment </label>
                <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
            </div>
            <input type="submit" value="Add"></input>
        </form>
    )
}

export default Form