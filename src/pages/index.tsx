import { Container, Grid } from '@material-ui/core'
import styled, { css } from 'styled-components'
import * as React from 'react'
import Layout from '../components/partials/Layout'
import { ResponsiveSectionWrapper } from '../components/partials/Section'
import SEO from '../components/partials/SEO'
import {
  Display,
  Label,
  LabelLarge,
  LabelXL,
  Lead,
  Paragraph,
  StyledLink,
  StyledLinkWrapper,
  Title,
  TitleLarge,
  TitleSmall,
  TitleXL
} from '../components/Typography'
import { graphql, Link } from 'gatsby'
import { Colors } from '../utilities/Colors'
import { Breakpoints, isSmall } from '../utilities/Breakpoints'
import { formatDate } from '../utilities/Functions'

export const RectangularImage = styled.div<{
  src: string
}>`
  background-image: url(${(props) => props.src});
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding-bottom: 56.25%;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  border-radius: 0.5rem;
`

const Article = ({
  title,
  publication,
  link,
  thumbnailImage
}: {
  title: string
  publication: string
  link: string
  thumbnailImage: { description: string; file: { url: string } }
}) => (
  <a href={link} target='_blank' rel='noreferrer'>
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <RectangularImage src={thumbnailImage.file.url} />
      </Grid>
      <Grid item xs={6} sm={6} md={6} lg={6}>
        <Label>{publication}</Label>
        <TitleSmall color={Colors.primary} fontSizeMobile={0.875}>
          {title}
        </TitleSmall>
      </Grid>
    </Grid>
  </a>
)
const IndexHeadline = styled.div`
  ${TitleLarge} {
    margin-top: 1rem;
  }
`
interface IPostPreview {
  title: string
  date: string
  urlSlug: string
  summary?: {
    summary: string
  }
  featuredImage: {
    file: {
      url: string
    }
  }
}
const IndexHeaderWrapper = styled.div`
  ${RectangularImage} {
    margin-top: 2rem;
  }
  ${TitleXL}, ${Paragraph}, ${StyledLinkWrapper} {
    display: block;
    margin-top: 1rem;
  }
`
const IndexHeader = ({
  headline,
  featuredPost
}: {
  headline: {
    mainImage: { description: string; file: { url: string } }
    title: string
    subtitle: string
    lead: { lead: string }
  }
  featuredPost: IPostPreview
}) => (
  <IndexHeaderWrapper>
    <IndexHeadline>
      <Display>{headline.title}</Display>
      <TitleLarge as='h2'>{headline.subtitle}</TitleLarge>
    </IndexHeadline>
    <a href={`/posts/${featuredPost.urlSlug}`}>
      <RectangularImage src={featuredPost.featuredImage.file.url} />
      <TitleXL>{featuredPost.title}</TitleXL>
      {featuredPost.summary && (
        <Paragraph>{featuredPost.summary.summary}</Paragraph>
      )}
      <StyledLink color={Colors.primary}>Read more &rarr;</StyledLink>
    </a>
  </IndexHeaderWrapper>
)

const AllPostsSectionWrapper = styled(ResponsiveSectionWrapper)`
  ${LabelXL} {
    text-align: center;
    margin-bottom: 2rem;
  }
`

const PostCardWrapper = styled.div`
  padding: 1rem;
  ${Label} {
    margin-top: 1rem;
  }
  ${Title}, ${Label} {
    transition: color 0.5s;
  }
  &:hover {
    ${Title}, ${Label} {
      color: ${Colors.primary};
    }
  }
`

export const PostCard = ({ post }: { post: IPostPreview }) => {
  const { title, date, urlSlug, featuredImage } = post
  return (
    <PostCardWrapper>
      <Link to={`/posts/${urlSlug}`}>
        <RectangularImage src={featuredImage.file.url} />
        <Label>{formatDate(date)}</Label>
        <Title>{title}</Title>
      </Link>
    </PostCardWrapper>
  )
}
export const PostList = ({ posts }: { posts: IPostPreview[] }) => (
  <Grid container spacing={4}>
    {posts.map((post, index) => (
      <Grid item xs={12} sm={12} md={6} lg={4} key={`post-${index}`}>
        <PostCard post={post} />
      </Grid>
    ))}
  </Grid>
)
const ArticleListItem = styled.li`
  padding: 2rem 0;
  &:not(:first-of-type) {
    border-top: 1px solid ${Colors.gray30};
  }
`
const IndexPage = ({ data }: { data: any }) => {
  const headline = data.headline.edges[0].node
  const featuredPost = data.featuredPost.edges[0].node
  const articles = data.articles.edges.map((edge) => edge.node)
  const posts = data.posts.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title='Remembering Chuy Negrete' />
      <ResponsiveSectionWrapper paddingSmall='3rem 0 2rem'>
        <Container>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <IndexHeader headline={headline} featuredPost={featuredPost} />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <LabelLarge>Press</LabelLarge>
              <ul>
                {articles.map((article, index) => (
                  <ArticleListItem key={`article-${index}`}>
                    <Article {...article}>{article.title}</Article>
                  </ArticleListItem>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Container>
      </ResponsiveSectionWrapper>
      <AllPostsSectionWrapper>
        <Container>
          <LabelXL>All posts</LabelXL>
          <PostList posts={posts} />
        </Container>
      </AllPostsSectionWrapper>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    headline: allContentfulHeadline {
      edges {
        node {
          title
          mainImage {
            description
            file {
              url
            }
          }
          subtitle
          lead {
            lead
          }
        }
      }
    }
    featuredPost: allContentfulPost(filter: { featured: { eq: true } }) {
      edges {
        node {
          title
          summary {
            summary
          }
          date(formatString: "MM-DD-YY")
          urlSlug
          featuredImage {
            file {
              url
            }
          }
        }
      }
    }
    posts: allContentfulPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          date(formatString: "MM-DD-YY")
          urlSlug
          location {
            location
          }
          featuredImage {
            file {
              url
            }
          }
        }
      }
    }
    articles: allContentfulPressArticle(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          link
          publication
          thumbnailImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
