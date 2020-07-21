import React from 'react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import HowTo from './how-to'
import {Responsive} from 'semantic-ui-react'

const HowItWorks = () => (
  <div>
    <Navbar />
    <div style={{display: 'flex', height: '100vh'}}>
      <div style={{flex: 1, padding: '50px'}}>
        <div style={{textAlign: 'center'}}>
          <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
            <h2 style={{fontSize: '4vw'}}>How It Works</h2>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <h2 style={{fontSize: '2.5vw'}}>How It Works</h2>
          </Responsive>
          <HowTo />
        </div>
      </div>
      <CustomSidebar />
    </div>
  </div>
)

export default HowItWorks
