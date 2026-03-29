import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const HomePage = () => (
  <>
    <Header />
    <div className="home-back-card">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="link" to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default HomePage
