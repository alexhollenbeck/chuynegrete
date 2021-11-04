import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

function SEO({
  description,
  lang,
  meta,
  title,
  image,
  noImage,
  robots
}: {
  description?: string
  lang?: string
  meta?: string
  title: string
  image?: string
  noImage?: boolean
  robots?: string
}) {
  const defaultTitle = `Remembering Chuy Negrete`
  const defaultDescription = `Remembering Chuy Negrete, Chicago-based 
  folksinger and lecturer who has entertained and inspired successive 
  generations of Latino and other youth for decades.`
  const metaDescription = description || defaultDescription
  const socialTitle = title || defaultTitle
  const socialDescription = description || defaultDescription
  let metaImage = image || `/img/og-image.jpeg`
  if (metaImage.substring(0, 2) === '//') {
    metaImage = 'https://' + metaImage.slice(2)
  }
  return (
    <>
      <Helmet>
        {/* General tags */}
        <title>{socialTitle}</title>
        <meta name='description' content={metaDescription} />
        {robots === 'hide' && (
          <meta name='robots' content='noindex, nofollow' />
        )}
        {!noImage && <meta name='image' content={metaImage} />}
        <meta property='og:title' content={socialTitle} />
        <meta property='og:description' content={socialDescription} />
        {!noImage && <meta property='og:image' content={metaImage} />}
      </Helmet>
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string
}

export default SEO
