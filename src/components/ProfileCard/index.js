import './index.css'

import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiCallStatus = {
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

const ProfileCard = props => {
  const {data, userInput, reloadByUserInput} = props

  const giveTheSuccessView = () => (
    <div className="profile-card">
      <img src={data.profileImageUrl} alt="profile" className="profile-img" />
      <h1 className="profile-username">{data.name}</h1>
      <p className="profile-bio">{data.shortBio}</p>
    </div>
  )

  const giveLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const giveFailureView = () => {
    const {retryButton} = props
    return (
      <div className="failure-card">
        <button className="error-button" type="button" onClick={retryButton}>
          Retry
        </button>
      </div>
    )
  }

  const getTheProfile = () => {
    const {profileApiCallStatus} = props
    switch (profileApiCallStatus) {
      case apiCallStatus.success:
        return giveTheSuccessView()
      case apiCallStatus.progress:
        return giveLoadingView()
      case apiCallStatus.failure:
        return giveFailureView()
      default:
        return null
    }
  }

  const getTheJobTypeItems = () =>
    employmentTypesList.map(each => {
      const {label, employmentTypeId} = each
      const {setTheJobType} = props
      const isClicked = () => {
        const a = document.getElementById(employmentTypeId)
        setTheJobType(employmentTypeId, a.checked)
      }
      return (
        <li key={employmentTypeId} className="job-type-list">
          <input
            type="checkbox"
            id={employmentTypeId}
            className="checkbox-input"
            onClick={isClicked}
          />
          <label htmlFor={employmentTypeId} className="label">
            {label}
          </label>
        </li>
      )
    })
  const getTheJobType = () => (
    <ul className="job-type-ul">{getTheJobTypeItems()}</ul>
  )

  const getTheSalaryTypeItems = () =>
    salaryRangesList.map(each => {
      const {salaryRangeId, label} = each
      const {setTheSalaryType} = props
      const salaryClicked = () => {
        setTheSalaryType(salaryRangeId)
      }
      return (
        <li key={salaryRangeId} className="salary-type-list">
          <input
            type="radio"
            className="radio-input"
            id={salaryRangeId}
            value={salaryRangeId}
            name="salary"
            onChange={salaryClicked}
          />
          <label htmlFor={salaryRangeId} className="label">
            {label}
          </label>
        </li>
      )
    })

  const getTheSalaryType = () => (
    <ul className="salary-type-ul">{getTheSalaryTypeItems()}</ul>
  )
  const changeTheuserinput = event => {
    const {setTheUserinput} = props
    setTheUserinput(event.target.value)
  }
  return (
    <div className="profile-back-card">
      <div className="search-card">
        <input
          type="search"
          value={userInput}
          className="search-input"
          placeholder="Search"
          onChange={changeTheuserinput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={reloadByUserInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
      {getTheProfile()}
      <hr />
      <div className="job-type-div">
        <h1 className="job-type-heading">Type of Employment</h1>
        {getTheJobType()}
      </div>
      <hr />
      <div className="salary-type-div">
        <h1 className="salary-type-heading">Salary Range</h1>
        {getTheSalaryType()}
      </div>
    </div>
  )
}

export default ProfileCard
