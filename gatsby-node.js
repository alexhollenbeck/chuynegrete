exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  let posts
  try {
    posts = await graphql(`
      {
        allContentfulPost {
          edges {
            node {
              urlSlug
              tags
            }
          }
        }
      }
    `)
  } catch (error) {
    console.log('Error Running Querying Posts', error)
  }

  posts = posts.data.allContentfulPost.edges

  posts.forEach((post, index) => {
    // Create individual posts pages.
    createPage({
      path: `/posts/${post.node.urlSlug}/`,
      component: require.resolve('./src/templates/post.tsx'),
      context: {
        urlSlug: post.node.urlSlug,
        tags: post.node.tags
      }
    })
  })
}
