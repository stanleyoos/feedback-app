import PropTypes from 'prop-types'

const FeedbackStats = ({ feedback }) => {
  // calculate rating average (accumulator, current)
  let average =
    feedback.reduce((acc, cur) => acc + cur.rating, 0) / feedback.length

  average = average.toFixed(1)
  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
}

export default FeedbackStats
