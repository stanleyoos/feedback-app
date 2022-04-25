import { useState, useEffect, useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

// select is a function from FeedbackContext, used to set global state
const RatingSelect = ({ select }) => {
  //
  const [selected, setSelected] = useState(5)
  const handleChange = (e) => {
    // onChange setSelected for color change => checked={selected === i + 1}
    // select(+e.currentTarget.value) => setRating in FeedbackForm
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }
  const { feedbackEdit } = useContext(FeedbackContext)
  // when feedbackEdit is clicked, change the checked rating in the array
  useEffect(() => {
    setSelected(feedbackEdit.item.rating)
  }, [feedbackEdit])
  return (
    <ul className="rating">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect
