// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFiltersData, seletedFilter, isActive} = props
  const {id, language} = languageFiltersData

  const onClickFilter = () => {
    seletedFilter(id)
  }

  const activeCN = isActive ? 'active' : ''

  return (
    <li>
      <button
        onClick={onClickFilter}
        className={`filter-data-btn ${activeCN}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
