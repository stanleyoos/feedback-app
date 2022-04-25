import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  // when data is being fetched isLoading === true
  // when finished setIsLoading(false)
  const [isLoading, setIsLoading] = useState(true)
  // fetch the feedback with useEffect
  const [feedback, setFeedback] = useState([])
  // when edit button is clicked useState to update feedbackEdit
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  // fetch data when page is loading at the begining
  useEffect(() => {
    fetchData()
  }, [])

  // remember to use async/await syntactic sugar!
  const fetchData = async () => {
    // fetch('/feedback') because of "proxy": "http://localhost:5001" in package.json
    const response = await fetch('/feedback')
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // delete function(id) from FeedbackItem
  // first pop up the confirm window
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure?')) {
      // json server is used for 'backend'
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      // filter feedback, if the item's id doesn't match the id
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  // addFeedback(newFeedback) from FeedbackForm
  const addFeedback = async (newFeedback) => {
    // post feedback at backend and add new element to frontend
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }
  // edit button in FeedbackItem
  // setFeedbackEdit above
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true })
  }

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json()
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  return (
    // provide all states and functions to main App component and all children
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
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
