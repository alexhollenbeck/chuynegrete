import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { Container, Grid } from '@material-ui/core'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Layout, { Nav } from '../components/partials/Layout'
import { ResponsiveSectionWrapper } from '../components/partials/Section'
import SEO from '../components/partials/SEO'
import {
  Display,
  LabelLarge,
  LabelXL,
  ParagraphLarge,
  Title,
  TitleSmall
} from '../components/Typography'
import { PostList, RectangularImage } from '../pages'
import { isLarge } from '../utilities/Breakpoints'
import { formatDate } from '../utilities/Functions'
import { Colors } from '../utilities/Colors'
import { richTextOptions } from '../utilities/richText'

const PostSectionWrapper = styled(ResponsiveSectionWrapper)`
  ${Display}, ${Title} {
    text-align: center;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  ${Title} {
    margin-top: 1rem;
    font-weight: 400;
    color: ${Colors.gray70};
  }
  ${RectangularImage} {
    margin-top: 4rem;
  }
`
const PostContent = styled.div`
  margin-top: 2rem;
  iframe {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
  }
  img {
    max-width: calc(100% - 4rem);
    box-sizing: border-box;
    margin: 2rem;
  }
  ${ParagraphLarge} {
    margin-top: 1rem;
  }
`
const RelatedPostsSectionWrapper = styled(ResponsiveSectionWrapper)`
  ${LabelXL} {
    text-align: center;
    margin-bottom: 2rem;
  }
`
const PostTemplate = ({ data }: { data: any }) => {
  const { featuredImage, title, date, body } = data.post.edges[0].node
  const relatedPosts = data.relatedPosts
  return (
    <Layout>
      <SEO title={title} />
      <PostSectionWrapper paddingLarge='1rem 0 5rem'>
        <Container>
          <Grid container>
            {isLarge && <Grid item lg={2}></Grid>}
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Nav />
              <Display>{title}</Display>
              <Title>Posted {formatDate(date)}</Title>
              <RectangularImage src={featuredImage.file.url} />
              <PostContent>{renderRichText(body, richTextOptions)}</PostContent>
            </Grid>
            {isLarge && <Grid item lg={2}></Grid>}
          </Grid>
        </Container>
      </PostSectionWrapper>
      <RelatedPostsSectionWrapper>
        <Container>
          <LabelXL>Related posts</LabelXL>
          <PostList posts={relatedPosts.edges.map((edge) => edge.node)} />
        </Container>
      </RelatedPostsSectionWrapper>
    </Layout>
  )
}
export default PostTemplate

export const pageQuery = graphql`
  query ($urlSlug: String!, $tags: [String]!) {
    post: allContentfulPost(filter: { urlSlug: { eq: $urlSlug } }) {
      edges {
        node {
          title
          date(formatString: "MM-DD-YY")
          tags
          featuredImage {
            file {
              url
            }
          }
          body {
            raw
            references {
              ... on ContentfulAsset {
                id
                contentful_id
                description
                __typename
                file {
                  url
                }
              }
              ... on ContentfulVideo {
                id
                title
                url
                contentful_id
                internal {
                  type
                }
              }
            }
          }
        }
      }
    }
    relatedPosts: allContentfulPost(
      filter: { urlSlug: { ne: $urlSlug }, tags: { in: $tags } }
      limit: 3
    ) {
      edges {
        node {
          title
          date(formatString: "MM-DD-YY")
          featuredImage {
            file {
              url
            }
          }
          urlSlug
        }
      }
    }
  }
`
