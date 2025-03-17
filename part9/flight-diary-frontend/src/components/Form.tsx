import { useState } from "react";
import diaryService from '../services/diaries'
import { Diary } from "../types";
import axios from "axios";
import RadioButton from "./RadioButton";
interface FormProps {
    diaries: Diary[],
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const Form = ({ diaries, setDiaries }: FormProps) => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        diaryService.createNew({ date, weather, visibility, comment }).then(response => setDiaries(diaries.concat(response))).catch((error) => {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data);
                setTimeout(() => {
                  setError('');
                }, 5000);
              }
        });
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    };

    const visibilityOptions = ["great", "good", "ok", "poor"];

    const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

    return (
        <>
        <div style={{color: 'red'}}>{error}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div>
                    <label>Visibility </label>
                    {visibilityOptions.map((v)=> <RadioButton key={v} value={visibility} button={v}  handleSelect={(e) => setVisibility(e.target.value)} />)}
                </div>
                <div>
                    <label>Weather </label>
                    {weatherOptions.map((w)=> <RadioButton key={w} value={weather} button={w}  handleSelect={(e) => setWeather(e.target.value)} />)}
                </div>
                <div>
                    <label>Comment </label>
                    <input value={comment} onChange={(e) => setComment(e.target.value)}></input>
                </div>
                <input type="submit" value="Add"></input>
            </form>
        </>
        
    )
}

export default Form