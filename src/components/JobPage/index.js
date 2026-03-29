import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobsItems from '../JobsItems'

const apiCallStatus = {
  inital: 'intial',
  progress: 'progress',
  success: 'success',
  failure: 'failure',
}

class JobPage extends Component {
  state = {
    userData: {},
    jobType: [],
    salaryType: '',
    userInput: '',
    jobsDataList: [],
    profileApiCallStatus: apiCallStatus.inital,
    jobsApiCallStatus: apiCallStatus.inital,
  }

  componentDidMount() {
    this.getTheUserProfile()
    this.getTheJobData()
  }

  getTheUserProfile = async () => {
    this.setState({profileApiCallStatus: apiCallStatus.progress})
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      const updatedDate = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userData: updatedDate,
        profileApiCallStatus: apiCallStatus.success,
      })
    } else {
      this.setState({profileApiCallStatus: apiCallStatus.failure})
    }
  }

  getTheJobData = async () => {
    this.setState({jobsApiCallStatus: apiCallStatus.progress})
    const {userInput, jobType, salaryType} = this.state
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(
      ` https://apis.ccbp.in/jobs?employment_type=${jobType.join()}&minimum_package=${salaryType}&search=${userInput}`,
      options,
    )
    const snakeCasedata = await response.json()
    if (response.ok) {
      const changeingMet = data => ({
        companyLogoUrl: data.company_logo_url,
        employmentType: data.employment_type,
        id: data.id,
        jobDescription: data.job_description,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        title: data.title,
      })

      const updatedData = snakeCasedata.jobs.map(each => changeingMet(each))
      this.setState({
        jobsDataList: updatedData,
        jobsApiCallStatus: apiCallStatus.success,
      })
    } else {
      this.setState({jobsApiCallStatus: apiCallStatus.failure})
    }
  }

  getTheSuccessView = () => {
    const {jobsDataList} = this.state
    if (jobsDataList.length === 0) {
      return (
        <div className="no-jobs-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-para">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list">
        {jobsDataList.map(each => (
          <JobsItems key={each.id} data={each} />
        ))}
      </ul>
    )
  }

  getTheLoadingView = () => (
    <div className="loader-container-jobs" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  reloadTheJobData = () => {
    this.getTheJobData()
  }

  getTheFailureView = () => (
    <div className="failure-card-in-jobs">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="error-button"
        type="button"
        onClick={this.reloadTheJobData}
      >
        Retry
      </button>
    </div>
  )

  getTheJobDetails = () => {
    const {jobsApiCallStatus} = this.state
    switch (jobsApiCallStatus) {
      case apiCallStatus.success:
        return this.getTheSuccessView()
      case apiCallStatus.progress:
        return this.getTheLoadingView()
      case apiCallStatus.failure:
        return this.getTheFailureView()
      default:
        return null
    }
  }

  setTheJobType = (id, bool) => {
    const {jobType} = this.state
    const rough = [...jobType]
    if (bool) {
      rough.push(id)
      this.setState({jobType: rough}, this.getTheJobData)
    } else {
      this.setState(
        {jobType: rough.filter(each => each !== id)},
        this.getTheJobData,
      )
    }
  }

  reloadByUserInput = () => {
    this.getTheJobData()
  }

  setTheSalaryType = id => {
    this.setState({salaryType: id}, this.getTheJobData)
  }

  setTheUserinput = value => {
    this.setState({userInput: value})
  }

  setTheUserinputDesktop = event => {
    this.setState({userInput: event.target.value})
  }

  retryButton = () => {
    this.getTheUserProfile()
  }

  render() {
    const {userData, userInput, profileApiCallStatus} = this.state
    return (
      <>
        <Header />
        <div className="job-back-card">
          <ProfileCard
            userInput={userInput}
            data={userData}
            setTheJobType={this.setTheJobType}
            setTheSalaryType={this.setTheSalaryType}
            setTheUserinput={this.setTheUserinput}
            profileApiCallStatus={profileApiCallStatus}
            retryButton={this.retryButton}
            reloadByUserInput={this.reloadByUserInput}
          />
          <div className="input-and-jobs-card">
            <div className="desktop-search-card">
              <input
                type="search"
                value={userInput}
                className="search-input-in-jobs"
                placeholder="Search"
                onChange={this.setTheUserinputDesktop}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.reloadByUserInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getTheJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default JobPage
