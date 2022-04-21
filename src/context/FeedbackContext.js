import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This feedback item 2',
      rating: 7,
    },
    {
      id: 3,
      text: 'This feedback item 3',
      rating: 9,
    },
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // delete function (filter the feedback state)
  // first pop up the confirm window
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  // add new item to array
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
