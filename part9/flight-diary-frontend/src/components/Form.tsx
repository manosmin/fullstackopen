import { useState } from "react";

const Form = () => {
    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("add");
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