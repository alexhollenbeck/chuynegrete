import React from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { RectangularImage } from '../../pages'
import { Colors } from '../../utilities/Colors'
import { formatDate } from '../../utilities/Functions'
import { IPostPreview } from '../../utilities/Interfaces'
import { Label, Title } from '../Typography'

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
