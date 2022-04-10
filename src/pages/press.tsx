import { Container, Grid } from '@material-ui/core'
import styled from 'styled-components'
import * as React from 'react'
import Layout, { Nav } from '../components/partials/Layout'
import { ResponsiveSectionWrapper } from '../components/partials/Section'
import SEO from '../components/partials/SEO'
import { Label, Title, TitleXL } from '../components/Typography'
import { graphql, Link } from 'gatsby'
import { Colors } from '../utilities/Colors'
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
const AllArticlesSectionWrapper = styled(ResponsiveSectionWrapper)`
  ${TitleXL} {
    text-align: center;
    margin-bottom: 2rem;
  }
`

const ArticleCardWrapper = styled.div`
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

export const ArticleCard = ({ article }: { article: IArticle }) => {
  const { title, publication, link, thumbnailImage, date } = article
  return (
    <ArticleCardWrapper>
      <Link to={link}>
        <RectangularImage src={thumbnailImage.file.url} />
        <Label>
          {publication} &bull; {formatDate(date)}
        </Label>
        <Title>{title}</Title>
      </Link>
    </ArticleCardWrapper>
  )
}
export const ArticleList = ({ articles }: { articles: IArticle[] }) => (
  <Grid container spacing={4}>
    {articles.map((article, index) => (
      <Grid item xs={12} sm={12} md={6} lg={4} key={`article-${index}`}>
        <ArticleCard article={article} />
      </Grid>
    ))}
  </Grid>
)
const PressPage = ({ data }: { data: any }) => {
  const articles = data.articles.edges.map((edge) => edge.node)
  return (
    <Layout>
      <SEO title='Remembering Chuy Negrete | Press' />
      <AllArticlesSectionWrapper paddingLarge='1rem 0 5rem'>
        <Container>
          <Nav />
          <TitleXL>Press</TitleXL>
          <ArticleList articles={articles} />
        </Container>
      </AllArticlesSectionWrapper>
    </Layout>
  )
}

export default PressPage

export const query = graphql`
  query {
    articles: allContentfulPressArticle(sort: { fields: date, order: DESC }) {
      edges {
        node {
          title
          link
          publication
          date(formatString: "MM-DD-YY")
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
