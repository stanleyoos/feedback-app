import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnIsDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() > 10) {
      const newFeedback = {
        text,
        rating,
      }
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
