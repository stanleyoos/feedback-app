import { useState } from 'react'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import feedbackData from './data/feedbackData'
const App = () => {
  // use state with data from external file
  const [feedback, setFeedback] = useState(feedbackData)

  // delete function (filter the feedback state)
  // first pop up the confirm window
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  return (
    <>
      <Header text="FeedbackUI" />
      <div className="container">
        <FeedbackForm />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  )
}

export default App
