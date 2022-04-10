import { useState } from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import feedbackData from './data/feedbackData'
const App = () => {
  const [feedback, setFeedback] = useState(feedbackData)

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  return (
    <>
      <Header text="FeedbackUI" />
      <div className="container">
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}

export default App
