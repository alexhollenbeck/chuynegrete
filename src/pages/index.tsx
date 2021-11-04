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
  Paragraph,
  Title,
  TitleLarge,
  TitleSmall
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

const IndexHeaderAvatar = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100px;
`
const IndexHeadline = styled.div`
  ${TitleLarge}, ${Paragraph} {
    margin-top: 1rem;
  }
  @media (min-width: ${Breakpoints.sm}px) {
    margin-left: 2rem;
  }
`

const IndexHeaderWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`

const IndexHeader = ({
  mainImage,
  secondaryImage,
  title,
  subtitle,
  lead
}: {
  mainImage: { description: string; file: { url: string } }
  secondaryImage: { description: string; file: { url: string } }
  title: string
  subtitle: string
  lead: { lead: string }
}) => (
  <>
    <RectangularImage src={mainImage.file.url} alt={mainImage.description} />
    <IndexHeaderWrapper>
      {!isSmall && (
        <IndexHeaderAvatar
          src={secondaryImage.file.url}
          alt={secondaryImage.description}
        />
      )}
      <IndexHeadline>
        <Display>{title}</Display>
        <TitleLarge as='h2'>{subtitle}</TitleLarge>
        <Paragraph>{lead.lead}</Paragraph>
      </IndexHeadline>
    </IndexHeaderWrapper>
  </>
)

const ArticleList = styled.ul``

const ArticleWrapper = styled.li`
  padding: 2rem 0;
  &:not(:first-of-type) {
    border-top: 1px solid ${Colors.gray30};
  }
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
  <ArticleWrapper>
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
  </ArticleWrapper>
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
interface IPost {
  title: string
  date: string
  urlSlug: string
  featuredImage: {
    file: {
      url: string
    }
  }
}
export const PostCard = ({ post }: { post: IPost }) => {
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
export const PostList = ({ posts }: { posts: IPost[] }) => (
  <Grid container spacing={4}>
    {posts.map((post, index) => (
      <Grid item xs={12} sm={12} md={6} lg={4} key={`post-${index}`}>
        <PostCard post={post} />
      </Grid>
    ))}
  </Grid>
)
const IndexPage = ({ data }: { data: any }) => {
  const headline = data.headline.edges[0].node
  const articles = data.articles.edges.map((edge) => edge.node)
  const posts = data.posts.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title='Remembering Chuy Negrete' />
      <ResponsiveSectionWrapper>
        <Container>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <IndexHeader {...headline} />
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <LabelLarge>Press</LabelLarge>
              <ArticleList>
                {articles.map((article, index) => (
                  <Article key={`article-${index}`} {...article}>
                    {article.title}
                  </Article>
                ))}
              </ArticleList>
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
          secondaryImage {
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
    posts: allContentfulPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          date(formatString: "MM-DD-YY")
          urlSlug
          body {
            raw
            references {
              ... on ContentfulAsset {
                id
                file {
                  url
                }
              }
              ... on ContentfulVideo {
                id
                title
                url
              }
            }
          }
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
