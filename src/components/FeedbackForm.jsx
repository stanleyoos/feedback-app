import { useState } from 'react'
import Card from './shared/Card'

const FeedbackForm = () => {
  const [text, setText] = useState('')
  const handleTextInput = (e) => {
    setText(e.target.value)
  }
  return (
    <Card>
      <form>
        <h2>How would you like rate our service?</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            value={text}
            onChange={handleTextInput}
          />
        </div>
      </form>
    </Card>
  )
}

export default FeedbackForm
