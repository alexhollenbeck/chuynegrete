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
import { IArticle } from '../utilities/Interfaces'

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

const Article = ({ title, publication, link, thumbnailImage }: IArticle) => (
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
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  @media (min-width: ${Breakpoints.md}px) {
    width: 58.3333%;
  }
  ${RectangularImage} {
    margin-top: 2rem;
  }
  ${Paragraph}, ${StyledLinkWrapper}, ${Label} {
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
      <Label>Featured</Label>
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
const HeaderContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  flex-direction: column;
  margin: -32px;
  width: calc(100% + 64px);
  @media (min-width: ${Breakpoints.md}px) {
    flex-direction: row;
  }
`
const HeaderPressWrapper = styled.div`
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  @media (min-width: ${Breakpoints.sm}px) {
    width: 41.6667%;
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
          <HeaderContentWrapper>
            <IndexHeader headline={headline} featuredPost={featuredPost} />
            <HeaderPressWrapper>
              <LabelLarge>Press</LabelLarge>
              <ul>
                {articles.map((article, index) => (
                  <ArticleListItem key={`article-${index}`}>
                    <Article {...article}>{article.title}</Article>
                  </ArticleListItem>
                ))}
              </ul>
              <StyledLink color={Colors.primary} to='/press'>
                See all articles &rarr;
              </StyledLink>
            </HeaderPressWrapper>
          </HeaderContentWrapper>
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
    articles: allContentfulPressArticle(
      sort: { fields: date, order: DESC }
      limit: 3
    ) {
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
