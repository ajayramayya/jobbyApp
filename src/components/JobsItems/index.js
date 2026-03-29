import './index.css'

import {ImStarFull, ImLocation} from 'react-icons/im'
import {Link} from 'react-router-dom'

import {RiSuitcaseLine} from 'react-icons/ri'

const JobsItems = props => {
  const {data} = props
  const {rating} = data
  return (
    <Link className="link" to={`/jobs/${data.id}`}>
      <li className="job-items">
        <div className="companyname-and-img-card">
          <img
            src={data.companyLogoUrl}
            alt="company logo"
            className="company-img"
          />
          <div className="title-and-rating-card">
            <h1 className="title">{data.title}</h1>
            <label className="label2">
              <ImStarFull className="star-icon" />
              <p className="rating"> {rating}</p>
            </label>
          </div>
        </div>
        <div className="location-jobtype-salary-card">
          <div className="location-jobtype-card">
            <ImLocation className="icon" />
            <p className="location">{data.location}</p>
            <RiSuitcaseLine className="icon" />
            <p className="job-type">{data.employmentType}</p>
          </div>
          <p className="salary">{data.packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="Description-heading">Description</h1>
        <p className="Description-para">{data.jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItems
