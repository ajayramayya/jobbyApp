import './index.css'

import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {ImStarFull, ImLocation} from 'react-icons/im'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {RiSuitcaseLine} from 'react-icons/ri'

import Header from '../Header'

const apiCallStatus = {
  inital: 'inital',
  progress: 'progress',
  failure: 'failure',
  success: 'success',
}

class JobItemsById extends Component {
  state = {
    jobData: {},
    skills: [],
    life: {},
    similar: [],
    jobApiCallStatus: apiCallStatus.inital,
  }

  componentDidMount() {
    this.getTheJobByIdDetails()
  }

  getTheJobByIdDetails = async () => {
    this.setState({jobApiCallStatus: apiCallStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const getSkills = skillData => ({
      imageUrl: skillData.image_url,
      name: skillData.name,
    })
    const getSimilarJobs = data => ({
      companyLogoUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      rating: data.rating,
      title: data.title,
    })
    const changeingMet = data => ({
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      skills: data.job_details.skills.map(each => getSkills(each)),
      similarJobs: data.similar_jobs.map(each => getSimilarJobs(each)),
    })
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = changeingMet(data)
      this.setState({
        jobData: updatedData,
        skills: updatedData.skills,
        life: updatedData.lifeAtCompany,
        similar: updatedData.similarJobs,
        jobApiCallStatus: apiCallStatus.success,
      })
    } else {
      this.setState({jobApiCallStatus: apiCallStatus.failure})
    }
  }

  getTheSkillsList = () => {
    const {skills} = this.state
    console.log(skills)
    return skills.map(each => (
      <li className="skills-items" key={each.name}>
        <img src={each.imageUrl} alt={each.name} className="skills-items-img" />
        <p className="skills-items-para">{each.name}</p>
      </li>
    ))
  }

  getTheSuccessView = () => {
    const {jobData, life, similar} = this.state
    return (
      <div className="job-by-id-card1">
        <div className="job-by-id-card2">
          <div className="companyname-and-img-card">
            <img
              src={jobData.companyLogoUrl}
              alt="job details company logo"
              className="company-img"
            />
            <div className="title-and-rating-card">
              <h1 className="title">{jobData.title}</h1>
              <label className="label2">
                <ImStarFull className="star-icon" />
                <p className="rating"> {jobData.rating}</p>
              </label>
            </div>
          </div>
          <div className="location-jobtype-salary-card">
            <div className="location-jobtype-card">
              <ImLocation className="icon" />
              <p className="location">{jobData.location}</p>
              <RiSuitcaseLine className="icon" />
              <p className="job-type">{jobData.employmentType}</p>
            </div>
            <p className="salary">{jobData.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="visit-link-card">
            <h1 className="Description-heading">Description</h1>
            <a
              href={jobData.companyWebsiteUrl}
              className="anchor-style"
              target="_blank"
              rel="noreferrer"
            >
              <p className="visit-para">Visit</p>
              <FaExternalLinkAlt size="15" />
            </a>
          </div>
          <p className="Description-para">{jobData.jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">{this.getTheSkillsList()}</ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="life-at-company-card">
            <p className="life-para">{life.description}</p>
            <img
              className="life-img"
              src={life.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-list">
          {similar.map(each => (
            <li className="similar-item" key={each.id}>
              <div className="companyname-and-img-card">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-img"
                />
                <div className="title-and-rating-card">
                  <h1 className="title">{each.title}</h1>
                  <label className="label2">
                    <ImStarFull className="star-icon" />
                    <p className="rating"> {each.rating}</p>
                  </label>
                </div>
              </div>
              <h1 className="Description-heading">Description</h1>
              <p className="Description-para">{each.jobDescription}</p>
              <div className="location-jobtype-salary-card">
                <div className="location-jobtype-card">
                  <ImLocation className="icon" />
                  <p className="location">{each.location}</p>
                  <RiSuitcaseLine className="icon" />
                  <p className="job-type">{each.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getTheloadingView = () => (
    <div className="loader-container-jobs-id" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  reloadTheJobId = () => {
    this.getTheJobByIdDetails()
  }

  getTheFailureView = () => (
    <div className="failure-card-in-jobs-id">
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
        onClick={this.reloadTheJobId}
      >
        Retry
      </button>
    </div>
  )

  getTheJobData = () => {
    const {jobApiCallStatus} = this.state
    switch (jobApiCallStatus) {
      case apiCallStatus.success:
        return this.getTheSuccessView()
      case apiCallStatus.progress:
        return this.getTheloadingView()
      case apiCallStatus.failure:
        return this.getTheFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.getTheJobData()}
      </>
    )
  }
}

export default JobItemsById
