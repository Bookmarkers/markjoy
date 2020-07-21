import React from 'react'
import {Icon} from 'semantic-ui-react'

const HowTo = () => (
  <div style={{textAlign: 'left', margin: '40px 0'}}>
    <div>
      bookmarq is for someone who:<br />
      <div style={{margin: '25px'}}>
        <Icon name="check" />has goals
        <br />
        <Icon name="check" />gets distracted online
        <br />
        <Icon name="check" />bookmark webpages then forgets about them
        <br />
        <Icon name="check" />needs to categorize all the bookmarks they’ve saved
      </div>
      If this is you, follow these steps to get organized today:
    </div>
    <ol>
      <li>
        Set your goals to achieve (up to five) in <a href="/goals">"Goals"</a>{' '}
        tab.
      </li>
      <li>
        Add or import your bookmarks, either via our{' '}
        <a href="https://github.com/Bookmarkers/extension">Chrome extension</a>{' '}
        or <a href="bookmarks">"Bookmarks"</a> tab.
      </li>
      <li>Assign bookmarks to your desired goal and category.</li>
      <li>
        Add websites you want to block in <a href="/blocked">"My blocks"</a>.
        Don't worry, you can unblock them anytime!
      </li>
      <li>
        Every time you visit one of the blocked websites, you'll be redirected
        to this page, where you'll be gently reminded of your dreams waiting to
        be fulfilled.
      </li>
      <li>Finally get to read those saved articles you've been meaning to.</li>
      <li>Tell your friends how much you love bookmarq.</li>
    </ol>
    <h3>Let bookmarq help you achieve your dreams.</h3>
    <a href="/goals">Get started today.</a>
  </div>
)

export default HowTo
