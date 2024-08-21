// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props

  const {startsCount, name, issuesCount, avatarUrl, forksCount} = repoData

  return (
    <li className="ri-card">
      <img className="ri-logo" src={avatarUrl} alt={name} />
      <h1 className="ri-title">{name}</h1>
      <div className="ri-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="ri-indi"
        />
        <p className="ri-para">{startsCount} stars</p>
      </div>
      <div className="ri-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="ri-indi"
        />
        <p className="ri-para">{forksCount} forks</p>
      </div>
      <div className="ri-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="ri-indi"
        />
        <p className="ri-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
