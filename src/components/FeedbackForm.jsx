import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnIsDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      // create new object
      const newFeedback = {
        text,
        rating,
      }
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
  }

  const handleTextInput = (e) => {
    if (text === '') {
      setMessage(null)
      setBtnDisabled(true)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you like rate our service?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextInput}
          />
          <Button type="submit" isDisabled={btnIsDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message} </div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
