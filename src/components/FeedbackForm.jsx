import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
  // input field has value={text}
  const [text, setText] = useState('')
  // rating comes from RatingSelect component, rating and setRating are send as select parameter
  const [rating, setRating] = useState(10)
  // text must be at least 10 characters long => setBtnDisabled(true)
  const [btnIsDisabled, setBtnDisabled] = useState(true)
  // if not: setMessage('Text must be at least 10 characters') and display it
  const [message, setMessage] = useState('')

  /* feedbackEdit is an object
  {
    item: {},
    edit: false,
  }
  */
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  // whenever edit button in FeedbackItem is clicked
  // feedbackEdit.edit === trueand item is filled with text and rating
  // FeedbackForm is filled with setText and setRating
  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  // form is submitted
  const handleSubmit = (e) => {
    // prevent reloading
    e.preventDefault()
    if (text.trim().length > 10) {
      // create new object, take text and rating from state
      const newFeedback = {
        text,
        rating,
      }
      // if edit button was clicked
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        // add new feedback
        addFeedback(newFeedback)
      }
      // reset input text field
      setText('')
    }
  }

  const handleTextInput = (e) => {
    // button is disabled when there is no text
    if (text === '') {
      setMessage(null)
      setBtnDisabled(true)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      // if text is at least 10 characters long
      setBtnDisabled(false)
      setMessage(null)
    }
    // set state with e.target.value
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
