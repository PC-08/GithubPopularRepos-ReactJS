import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeOption: languageFiltersData[0].id,
    reposArray: 'initial',
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {activeOption} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeOption}`

    const response = await fetch(url)

    const data = await response.json()

    const formattedData = data.popular_repos.map(eachRep => ({
      avatarUrl: eachRep.avatar_url,
      forksCount: eachRep.forks_count,
      id: eachRep.id,
      issuesCount: eachRep.issues_count,
      name: eachRep.name,
      startsCount: eachRep.stars_count,
    }))

    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        reposArray: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }

    console.log(data)
  }

  seletedFilter = id => {
    this.setState({activeOption: id}, this.getRepos)
  }

  getBasedOnResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
    </div>
  )

  renderSuccessView = () => {
    const {reposArray} = this.state
    return (
      <ul className="ri-con">
        {reposArray.map(eachRep => (
          <RepositoryItem key={eachRep.id} repoData={eachRep} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeOption} = this.state
    return (
      <div className="bg">
        <h1 className="head">Popular</h1>
        <ul className="filters-list">
          {languageFiltersData.map(eachLan => (
            <LanguageFilterItem
              key={eachLan.id}
              languageFiltersData={eachLan}
              seletedFilter={this.seletedFilter}
              isActive={eachLan.id === activeOption}
            />
          ))}
        </ul>
        <div className="bottom">{this.getBasedOnResult()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
