import { motion, AnimatePresence } from 'framer-motion'
import Spinner from './shared/Spinner'
import FeedbackItem from './FeedbackItem'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
  // fetch feedback from server => useEffect in Context
  // when data is fetched then isLoading === false
  const { feedback, isLoading } = useContext(FeedbackContext)

  // when feedback is fetched and the array is empty
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <div>No feedback yet</div>
  }

  // AnimatePresence and motion for animation
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default FeedbackList
